// import deepEqual from 'deep-equal';
import diff from 'deep-diff';
import { flat, deepEqual, diffProps } from './common'

let dom = {};

const addEventListener = (el, name, fn) => {
  const names = Array.isArray(name) ? name : name.split(' ')
  names.forEach((n) => {
    el.addEventListener(
      n.replace(/^on/, '').toLowerCase(),
      fn,
      false
    );
  })
}

const removeEventListener = (el, name, fn) => {
  const names = Array.isArray(name) ? name : name.split(' ')
  names.forEach((n) => {
    el.removeEventListener(
      n.replace(/^on/, '').toLowerCase(),
      fn,
      false
    );
  })
}

const setAttribute = (el, key, value) => {
  if (value === null) {

  } else if (typeof value === 'object' && key === 'style') {
    Object.keys(value).forEach(k => {
      try {
        el[key][k] = value[k];
      } catch (e) {
        console.log({ el, key, k, value });
      }
    })
  } else if (typeof value === 'string') {
    switch (key) {
      case 'value':
        el.value = value
        break;
      default:
        el.setAttribute(key === 'className' ? 'class' : key, value)
    }
  }
}

const removeAttributes = (el) => {
  if (el && el.attributes) {
    while(el.attributes.length > 0)
      el.removeAttribute(el.attributes[0].name);
  }
}

const setAttributes = (el, attrs = {}) => {
  for (let attr in attrs) {
    if (typeof attrs[attr] === 'function') {
      el[attr.toLowerCase()] = attrs[attr];
    } else {
      if (['string', 'number'].includes(typeof attrs[attr])) {
        console.log('setAttributes', el, attrs[attr]);
        setAttribute(el, attr, attrs[attr]);
      }
    }
  }
}

const replaceWith = (elemPrev, elemNext) => {
  const prev = Array.isArray(elemPrev) ? elemPrev : [elemPrev];
  const next = Array.isArray(elemNext) ? elemNext : [elemNext];

  prev.forEach((item, i) => {
    if (next[i]) item.replaceWith(next[i]);
  });
}

class Component {
  constructor(props) {
    // if (props && !props.id) console.warn('No param ID', this);
    this.props = {...this.defaultProps, ...(props || {})};
    this.state = {...(this.state || {})};
    this.prevState = {};
  }

  componentDidMount() { }

  componentWillmount() { }

  componentWillUnmount() { }

  shouldComponentUpdate() { return true }

  componentWillUpdate() { }

  componentDidUpdate() {
    // console.log('updated', this.name);
  }

  mount = (el) => {
    try {
      this.id = el.getAttribute('id');

      this.componentWillmount()
      this.elem = el;
      this.componentDidMount();
      return this.elem;
    } catch (e) {
      console.log(e);
      return this.elem;
    }
  }

  unmount = () => {
    this.componentWillUnmount();


  }

  update = (nextProps, nextState) => {
    console.log('update');
    if (this.shouldComponentUpdate(nextProps, nextState)) {
      this.componentWillUpdate(nextProps, nextState);

      this.props = nextProps;
      this.state = nextState;

      this.elem = updateDomObject(this);

      this.componentDidUpdate(nextProps, nextState);
    } else {
      this.props = nextProps;
      this.state = nextState;
    }
    return this.elem;
  }

  setState = (data, fn) => {
    // console.log('setState', data, !!fn);
    const state = typeof data === 'function'
      ? data(this.state) : data

    const nextState = { ...this.state, ...state };
    if (deepEqual(nextState, this.state)) return;
    console.log('setState');

    this.prevState = { ...this.state };

    if (fn) {
      fn(nextState);
    }

    this.update(this.props, nextState);
  }

  renderWrapper = () => {
    const obj = this.render();
    return {
      ...obj,
      func: this,
    }
  }
}
Component.defaultProps = {}

const getClassesById = (obj) => {
  if (!obj || ['number', 'string'].includes(typeof obj)) return [];
  try {
    let classes = [];
    if (obj.func) classes.push(obj.func)
    for (var i = 0; i < obj.children.length; i++) {
      if (obj.children[i].func) classes.push(obj.children[i].func)
      classes = [...classes, ...getClassesById(obj.children[i])];
    }
    return classes
  } catch (e) {
    console.log(e);
    console.log(obj);
    return []
  }
}

const deepComponentUnmount = (obj) => {
  const classes = getClassesById(obj);
  for (var i = 0; i < classes.length; i++) {
    classes[i].unmount()
  }
}

const updateDomJson = (id, prev, next) => {
  if (prev.attrs.id === id) {
    return next;
  }

  for (var i = 0; i < prev.children.length; i++) {
    if (prev.children[i].attrs.id === id) {
      prev.children[i] = next;
    } else {
      prev.children[i] = updateDomJson(id, prev.children[i], next)
    }
  }

  return prev;
}

window._getClass = (el) => {
  return getElementByKey(dom, el.id);
}

// window.deepEqual = deepEqual
const compareAndUpdate = (prev, next, prevParent) => {
  if (!prev) {
    if (prevParent) prevParent.appendChild(getHtmlByJson(next))
    throw '!prev'
    return;
  }

  if (typeof prev !== 'object') {
    switch (typeof prev) {
      case 'number':
      case 'string':
        if (prev !== next && prevParent) {
          if (typeof next === 'string') prevParent.innerText = next;
          else {
            prevParent.appendChild(getHtmlByJson(next))
          }
        }
        break;
      default:
    }
    return ;
  }

  try {
    const prevEl = document.getElementById(prev.attrs.id);
    // if (prevEl.isEqualNode(nextEl)) {
    //   return;
    // } else {

    // if (next.attrs.id === 'app-1-0-0-1-0') console.warn('app-1-0-0-1-0', key);

    if (!prevEl) {
      if (prevParent) prevParent.appendChild(getHtmlByJson(next))
      throw '!prevEl'
      return;
    }

    // TODO: Сделать проверку по Class
    if (prev.tag !== next.tag) {
      const nextEl = getHtmlByJson(next);
      return prevEl.replaceWith(nextEl);
    }

    const attrs = diffProps(prev.attrs, next.attrs)
    if (Object.keys(attrs).length !== 0) {
      // console.warn('ATTRS CHANGED', attrs);
      prev.attrs = next.attrs;
      setAttributes(prevEl, attrs);
      // console.log('next.children', prevAttrs, nextAttrs);
    }

    const prevProps = prev.func ? {...prev.func.props} : {};
    const nextProps = next.func ? {...prevProps, ...next.func.props} : {};
    const equalProps = deepEqual(prevProps, nextProps);
    if (!equalProps) {
      // console.log('changed props', prev, next);
      prev.func.componentWillUpdate(nextProps, prev.func.state)
      prev.func.props = nextProps;
      prev.func.componentDidUpdate(prevProps, prev.func.state)
      // setAttributes(prevEl, attrs);
      const events = {}
      for (var i in nextProps) {
        if (nextProps.hasOwnProperty(i) && typeof nextProps[i] === 'function') {
          events[i] = nextProps[i]
        }
      }
      setAttributes(prevEl, events);
      // console.log('PROPS CHANGED', prev.func, next.func);
    }

    let pushKeys = []
    let removeKeys = []
    let replaceKeys = []
    let nextKeys = [];

    
    for (var i = 0; i < next.children.length; i++) {
      if (!next.children[i].attrs || !next.children[i].attrs.key) {
        // console.log(next.children[i]);
        continue;
      }
      let prevChild;
      const { attrs: { key } } = next.children[i]

      for (var p = 0; p < prev.children.length; p++) {
        if (prev.children[p].attrs.key === key) {
          prevChild = {i: p, o: prev.children[p]};
          continue;
        }
      }
      nextKeys.push([
        prevChild,
        {i, o: next.children[i]}
      ])
      // if (!next.children[i]) console.warn('NOT FOUND', next); return;
    }
    //
    // const prevEls = {}
    //
    // if (nextKeys.length) {
    //   for (var i = 0; i < prevEl.children.length; i++) {
    //     prevEls[prevEl.children[i].getAttribute('key')] = prevEl.children[i];
    //   }
    //   const removePrevKeys = [...Array(prevEl.children.length).keys()].map(i => [
    //     i, prevEl.children[i], prev.children[i]
    //   ]);
    //   for (var i = 0; i < nextKeys.length; i++) {
    //     if (!nextKeys[i][0] || !nextKeys[i][0].o) pushKeys.push([nextKeys[i][1].i, nextKeys[i][1].o])
    //     else {
    //       delete removePrevKeys[nextKeys[i][0].i];
    //       compareAndUpdate(nextKeys[i][0].o, nextKeys[i][1].o, prevEl);
    //     }
    //   }
    //   removeKeys = removePrevKeys.filter(n => !!n);
    // }

    // console.log(nextKeys);


    if (!prevEl) console.error(next);
    if (!next) console.error(prevEl);

    const childrenLength = nextKeys.length ? 0 : Math.max(prevEl.children.length, next.children.length);
    for (var i = 0; i < childrenLength; i++) {
      if (prev.children[i] && next.children[i]) {
        if (prev.children[i].attrs
         && prev.children[i].attrs.className !== next.children[i].attrs.className) {
          // console.log('next.children[i].attrs', JSON.parse(JSON.stringify(prev.children[i])), next.children[i].attrs);
          deepComponentUnmount(prev.children[i]);
          prevEl.children[i].replaceWith(getHtmlByJson(next.children[i]));
          replaceKeys.push([i, next.children[i]])
        } else {
          // console.log('compareAndUpdate', prev.children[i], next.children[i]);
          try {
            compareAndUpdate(prev.children[i], next.children[i], prevEl);
          } catch (e) {
            console.warn('ERROR compareAndUpdate', prev.children[i], next.children[i], prevEl);
          }
        }
      } else if (!next.children[i]) {
        // console.log('prevEl.children', prevEl.children);
        // console.log('removed', prev.children[i]);
        // TODO: Неправильно удаляются
        // try {
        //   prevEl.children[i].remove();
        // } catch (e) {
        //   console.warn('prevEl.children[i]', prevEl.children.length);
        // }
        removeKeys.push([i, prevEl.children[i], prev.children[i]])
      } else {
        pushKeys.push([i, next.children[i]])
      }
    }
    if (replaceKeys.length) {
      // console.log('replaceKeys', replaceKeys, next);
      for (var i = 0; i < replaceKeys.length; i++) {
        prev.children.splice(replaceKeys[i][0], 1, replaceKeys[i][1])
      }
    }
    if (removeKeys.length) {
      // console.log('removeKeys', removeKeys);
      // console.log('removeKeys', removeKeys, prev);
      for (var i = 0; i < removeKeys.length; i++) {
        deepComponentUnmount(removeKeys[i][2]);
        removeKeys[i][1].remove()
        if (removeKeys[i][2].func) {
          removeKeys[i][2].func.unmount();
        }
      }
      const keys = removeKeys.map(n => n[0]);
      prev.children = prev.children.filter((n, i) => keys.indexOf(i) === -1)
    }
    if (pushKeys.length) {
      // console.log('pushKeys', pushKeys, next);
      for (var i = 0; i < pushKeys.length; i++) {
        prevEl.appendChild(getHtmlByJson(pushKeys[i][1]));
        prev.children.splice(pushKeys[i][0], 0, pushKeys[i][1])
      }
    }

    // if (Object.keys(prevEls).length) console.warn('END PREV CHILDS', prevEls);
  } catch (e) {
    console.warn(e);
    console.warn({prev, next});
    throw new Error('Dom update error')
  }
}

const updateDomObject = (self) => {
  try {
    const prev = getElementByKey(dom, self.id);
    // if (!prev) console.warn('getElementByKey(dom, self.id)', dom, self.id);
    const next = setKeysToDom(self.renderWrapper(), self.id);
    // if (prev === false) console.log(self);
    // console.warn('prev', getElementByKey(prev, 'app-1'));
    // return ;
    console.log('prev', self.id, prev, next);
    compareAndUpdate(prev, next);
    // console.log('dom', dom);
    const elem = document.getElementById(self.id);
    console.log({prev, next});
    return elem;
  } catch (e) {
    console.log(e);
    console.log({dom, self});
  }
}

const renderDom = (id, component) => {
  console.log('component', component);
  const d = new component()
  const el = document.getElementById(id);
  dom = setKeysToDom(d.render(), 'app');
  console.log('dom', dom);
  const html = getHtmlByJson(dom);
  if (el.children.length) {
    el.children.replaceWith(html);
  } else {
    el.append(html);
  }
}

const getElementByKey = (obj, key) => {
  try {
    if (!obj || !obj.attrs) return false;
    if (obj.attrs.id === key) return obj
    let item;
    for (var i = 0; i < obj.children.length; i++) {
      item = getElementByKey(obj.children[i], key);
      if (item) return item;
    }
    return item;
  } catch (e) {
    console.warn(key, obj);
    return undefined;
  }
  return false
}

const setKeysToDom = (item, key) => {
  if (
    item === null
    || item === undefined
    || typeof item === 'boolean'
    || typeof item === 'string'
  ) return;

  try {
    let { children } = item;
    let keyAttr = key;

    if (Array.isArray(item)) {
      children = item
    } else {
      item.attrs.id = key;
    }

    children.forEach((n, i) => {
      setKeysToDom(n, `${key}-${i}`);
    })
  } catch (e) {
    console.log(e);
    console.log(item);
  }

  return item;
}

const createElementWrapper = (tag, attrs, ...children) => {
  return createElement(tag, attrs || {}, ...children);
}

const createElement = (tag, attrs, ...children) => {
  // if (!attrs.id) console.warn('No param ID', {tag, attrs});
  if (typeof tag === 'function') {
    const props = {...(tag.defaultProps || {}), ...attrs, children: (children.length ? children : undefined)}

    if (tag.prototype instanceof Component) {
      const child = new tag(props);
      return child.renderWrapper();
    } else {
      return tag(props);
    }
  }

  try {
    if (tag) {
      if (typeof children === 'number') children = String(children);
      return {
        tag, attrs, children: flat(children).filter(n => !!n),
      }
    }
  } catch (e) {
    console.log(e, tag);
  }

  return undefined;
}

const getHtmlByJson = ({ tag, attrs, children, func }) => {
  try {
    if (typeof tag === 'string') {
      const el = document.createElement(tag);
      if (attrs && typeof attrs === 'object') {
        for (let attr in attrs) {
          if (typeof attrs[attr] === 'function') {
            addEventListener(el, attr, attrs[attr]);
          } else if (attrs[attr] !== undefined) {
            if (attr.id) console.log(el, attr);
            setAttribute(el, attr, attrs[attr]);
          }
        }
      }

      flat(children).forEach(item => {
        if (['string', 'number'].includes(typeof item)) {
          el.innerHTML += item;
        } else if (item) {
          try {
            el.appendChild(getHtmlByJson(item))
          } catch (e) {
            console.log(item, e);
          }
        }
      })

      if (func) func.mount(el);
      return el
    }
  } catch (e) {
    console.log(e, tag);
  }
  return undefined;
}

const Fragment = () => {
  return null;
}

const createRef = () => ({
})

export {
  createElement,
  Fragment,
  Component,
  renderDom,
  addEventListener,
  removeEventListener,
}

class Dom {
  static Component = Component;
  static createElement = createElementWrapper;
  // static createElement = (...props) => console.log(...props);
  static Fragment = Fragment;
  static createRef = createRef;
}

export default Dom;

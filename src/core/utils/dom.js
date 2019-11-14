import deepEqual from 'deep-equal';
import diff from 'deep-diff';
import { flat } from './common'

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
    el.setAttribute(key === 'className' ? 'class' : key, value)
  }
}

const setAttributes = (el, attrs = {}, addEventListener = false) => {
  for (let attr in attrs) {
    if (typeof attrs[attr] === 'function') {
      if (addEventListener) addEventListener(el, attr, attrs[attr]);
    } else {
      if (['string', 'number'].includes(attrs[attr])) {
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
    console.log('setState');
    const state = typeof data === 'function'
      ? data(this.state) : data

    const nextState = { ...this.state, ...state };
    if (deepEqual(nextState, this.state)) return;

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

const deepComponentUnmount = (key) => {
  if (!key) return;
  const item = document.getElementById(key);
  if (classes[key]) {
    classes[key].unmount();
    delete classes[key];
  }
  if (item) {
    for (var i = 0; i < item.children.length; i++) {
      deepComponentUnmount(item.children[i].getAttribute('id'))
    }
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

const compareAndUpdate = (prev, next, prevParent) => {
  if (typeof prev !== 'object') {
    switch (typeof prev) {
      case 'string':
        if (prev !== next && prevParent) {
          if (typeof next === 'string') prevParent.appendChild(next);
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
    const nextEl = getHtmlByJson(next);
    // if (prevEl.isEqualNode(nextEl)) {
    //   return;
    // } else {
      if (prev.tag !== next.tag) {
        return prevEl.replaceWith(nextEl);
      }
      const { children: prevChildred, ...prevAttrs } = prev.attrs;
      const { children: nextChildred, ...nextAttrs } = next.attrs;
      if (!deepEqual(prevAttrs, nextAttrs)) {
        prev.attrs = next.attrs;
        setAttributes(prevEl, next.attrs);
        if (prev.func) {
          const prevProps = {...prev.func.props};
          const nextProps = {...prevProps, ...next.attrs};
          // console.log('changed props', prev, next);
          prev.func.componentWillUpdate(nextProps, prev.func.state)
          prev.func.props = nextProps;
          prev.func.componentDidUpdate(prevProps, prev.func.state)
        }
      }
      const childrenLength = Math.max(prev.children.length, next.children.length);

      const pushKeys = []
      const removeKeys = []
      for (var i = 0; i < childrenLength; i++) {
        if (prev.children[i] && next.children[i]) {
          compareAndUpdate(prev.children[i], next.children[i], prev);
        } else if (!next.children[i]) {
          // console.log('prevEl.children', prevEl.children);
          prevEl.children[i].remove();
          removeKeys.push(i)
          if (prev.children[i].func) {
            prev.children[i].func.unmount();
          }
        } else {
          pushKeys.push([i, next.children[i]])
          prevEl.appendChild(getHtmlByJson(next.children[i]));
        }
      }
      if (removeKeys.length) {
        // console.log('removeKeys', removeKeys);
        prev.children = prev.children.filter((n, i) => (
          removeKeys.indexOf(i) === -1
        ))
      }
      if (pushKeys.length) {
        // console.log('pushKeys', pushKeys);
        for (var i = 0; i < pushKeys.length; i++) {
          prev.children.splice(pushKeys[i][0], 0, pushKeys[i][1])
        }
      }
    // }
  } catch (e) {
    console.log(e);
    console.log({prev, next});
    // throw new Error('Dom update error')
  }
}

const updateDomObject = (self) => {
  try {
    const prev = getElementByKey(dom, self.id);
    const next = setKeysToDom(self.renderWrapper(), self.id);
    // if (prev === false) console.log(self);
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
    if (obj.attrs.id === key) return obj
    let item;
    for (var i = 0; i < obj.children.length; i++) {
      item = getElementByKey(obj.children[i], key);
      if (item) continue;
    }
    return item;
  } catch (e) {
    return undefined;
  }
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

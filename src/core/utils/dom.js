import deepEqual from 'deep-equal';
import diff from 'deep-diff';
import { flat } from './common'

// let dom = {};
window.classes = {};

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

  componentWillmount() {
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount');
  }

  // shouldComponentUpdate() { return true }

  // componentWillUpdate() { }
  //
  // componentDidUpdate() {}

  mount = (el) => {
    try {
      this.id = el.id;

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

  // update = (nextProps, nextState) => {
  //   if (this.shouldComponentUpdate(nextProps, nextState)) {
  //     this.componentWillUpdate(nextProps, nextState);
  //
  //     this.props = nextProps;
  //     this.state = nextState;
  //
  //     // this.elem = updateDomObject(this);
  //
  //     this.componentDidUpdate(nextProps, nextState);
  //   } else {
  //     this.props = nextProps;
  //     this.state = nextState;
  //   }
  //   return this.elem;
  // }

  setState = (data, fn) => {
    // console.log('setState', data, !!fn);
    const state = typeof data === 'function'
      ? data(this.state) : data
    const nextState = { ...this.state, ...state };

    if (deepEqual(nextState, this.state)) return;
    // this.prevState = { ...this.state };
    this.state = nextState;

    if (fn) {
      fn(this.state);
    }

    // this.update(this.props, nextState);
  }

  renderWrapper = (render) => {
    const obj = render || this.render();
    return {
      ...obj,
      func: this,
    }
  }

  replace = (id, render, settings = {}) => {
    const dom = setKeysToDom(render(), id);
    console.log('replace', dom);
    const html = getHtmlByJson(dom);
    const el = this.getElementById(id)

    if (settings.replaceChilds) {
      el.innerHTML = '';
      if (settings.setAttrs) setAttribute(el, dom.attrs);

      if (html.children.length) {
        const fragment = new DocumentFragment();
        for (let i = 0; i < html.children.length; i++) {
          fragment.append(html.children[i]);
        }

        el.append(fragment);
      }
    } else {
      el.replaceWith(html)
    }
  }

  getElementById = (id) => {
    return document.getElementById(id);
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

const getIdByPath = (path) => {
  let item = dom;
  let id;
  try {
    for (var i = 0; i < path.length; i++) {
      if (i === path.length - 1) continue;
      item = item[path[i]]
      if (!Array.isArray(item)) {
        id = item.attrs.id;
      }
    }
    return id;
  } catch (e) {
    console.warn('getIdByPath', item, path);
    return undefined;
  }
}

const applyChangesDom = (d) => {
  console.log('d', d);
  switch (d.constructor.name) {
    case 'DiffArray': {
      const id = getIdByPath(d.path)
      switch (d.item.constructor.name) {
        case 'DiffNew':
          const parent = document.getElementById(id);
          // console.log();
          parent.append(getHtmlByJson(d.item.rhs))
          // console.log('d', d);
          // console.log('parent', parent);
          break;
        default:

      }
      break;
    }
    default:
  }
}

const updateDomObject = (self) => {
  const prev = getElementByKey(dom, self.id);
  const next = setKeysToDom(self.renderWrapper(), self.id);



  // const diffData = diff(prev, next, (path, key) => key === 'func');
  // const diffData = [];
  // diff.observableDiff(prev, next, (d, ...props) => {
  //   if (d && d.lhs && typeof d.lhs !== 'function' || !d.lhs) {
  //     applyChangesDom(d);
  //     // console.error(...props);
  //     diffData.push(d);
  //   }
  // }, (path, key) => {
  //   return key === 'func' || key === 'attrs'
  // });
  //
  // console.log(diffData, prev, next);
  // // dom = updateJsonDom(dom, next);
  // diffData.forEach(d => {
  //   diff.applyChange(prev, next, d);
  // })
  // console.log(dom);
  const elem = document.getElementById(self.id);
  return elem;
}

// const updateJsonDom = (prev, next) => {
//   try {
//     if (prev.attrs.id === next.attrs.id) {
//       return next;
//     }
//     for (var i = 0; i < prev.children.length; i++) {
//       console.log(prev.children[i].attrs.id, next.attrs.id);
//       if (prev.children[i].attrs.id === next.attrs.id) {
//         prev.children[i] = next;
//         console.log('Нашел', prev.children[i], next);
//         continue;
//       } else {
//         updateJsonDom(prev.children[i], next);
//       }
//     }
//   } catch (e) {
//     console.log('ERROR', prev.children[i]);
//   }
//   return prev;
// }

renderComponent = ({ tag, props }) => {
  switch (typeof component.tag) {
    case 'function': {
      if (tag.prototype instanceof Component) {
        return
      } else {

      }
      break;
    }
    case 'string': {
      return getHtmlByJson()
    }
    default:

  }

}


const renderDom = (id, component) => {
  // const d = new component()
  // const el = document.getElementById(id);
  return console.log(component.tag);
  const dom = setKeysToDom(d.render(), 'app');
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

// const allowAttrs = ['className', 'value', ]
// const setAllowAttrs

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
      if (classes[key]) {
        deepComponentUnmount(key);
      }
      if (item.func) classes[key] = item.func
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

const DomOwner = {
  current: null,
}

const createElement = (tag, attrs, ...children) => {
  // if (typeof tag === 'function') {
  //   const props = {...(tag.defaultProps || {}), ...attrs, children: (children.length ? children : undefined)}
  //
  //   if (tag.prototype instanceof Component) {
  //     const child = new tag(props);
  //     return child.renderWrapper();
  //   } else {
  //     return tag(props);
  //   }
  // }

  let propName;
  const props = attrs || {}

  if (children.length === 1) {
    props.children = children[0];
  } else {
    props.children = children;
  }

  if (tag && tag.defaultProps) {
    const defaultProps = tag.defaultProps;

    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  try {
    if (tag) {
      return {
        tag,
        props,
        children,
        owner: DomOwner.current,
      }
    }
  } catch (e) {
    console.log(e, tag);
  }

  return undefined;
}

const getHtmlByJson = ({ tag, attrs, func }) => {
  try {
    if (typeof tag === 'string') {
      const el = document.createElement(tag);
      if (attrs && typeof attrs === 'object') {
        for (let attr in attrs) {
          if (attr === 'children') break;
          if (typeof attrs[attr] === 'function') {
            addEventListener(el, attr, attrs[attr]);
          } else if (attrs[attr] !== undefined) {
            // if (attr.id) console.log(el, attr);
            if (attr === 'ref') {
              // console.log('ref', tag, attrs);
              attrs[attr].el = el;
              attrs[attr].id = attrs.id;
            } else {
              setAttribute(el, attr, attrs[attr]);
            }
          }
        }
      }

      flat(props.children).forEach(item => {
        if (['string', 'number'].includes(typeof item)) {
          el.innerHTML += item;
        } else if (item) {
          try {
            el.append(getHtmlByJson(item))
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
  static Component = Component;;
  static createElement = createElementWrapper;
  // static createElement = (...props) => console.log(...props);
  static Fragment = Fragment;
  static createRef = createRef;
}

export default Dom;

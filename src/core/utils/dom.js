const addEventListener = (el, name, fn) => {
  el.addEventListener(
    name.replace(/^on/, '').toLowerCase(),
    fn,
    false
  );
}

class Component {
  constructor(props) {
    console.log(props, this);
    this.props = {...this.defaultProps, ...(props || {})};
  }
}
Component.defaultProps = {}


const renderDom = (id, component) => {
  const d = new component()
  const el = document.getElementById(id);
  el.replaceWith(d.render());
}

const setAttribute = (el, key, value) => {
  if (typeof value === 'object') {
    Object.keys(value).forEach(k => {
      el[key][k] = value[k];
    })
  } else {
    el.setAttribute(key === 'className' ? 'class' : key, value)
  }
}

const createElement = (tag, attrs, ...children) => {
  // if (attrs) console.log('attrs', attrs);

  if (typeof tag === 'function') {
    const child = new tag({...tag.defaultProps, ...(attrs || {})});
    if (child instanceof Component) {
      return child.render();
    }
  }

  if (tag) {
    const el = document.createElement(tag);
    if (attrs && typeof attrs === 'object') {
      Object.keys(attrs).forEach(attr => {
        if (typeof attrs[attr] === 'function') {
          addEventListener(el, attr, attrs[attr]);
        } else if (attrs[attr] !== undefined) {
          setAttribute(el, attr, attrs[attr])
        }
      })
    }

    children.forEach(item => {
      if (['string', 'number'].includes(typeof item)) {
        el.innerHTML += item;
      } else if (item) {
        try {
          el.appendChild(item)
        } catch (e) {
          console.log(item, e);
        }
      }
    })
    return el
  }
}

const Fragment = (...props) => {
  console.log(...props);
}

export {
  createElement,
  Fragment,
  Component,
  renderDom,
}

class Dom {
  static Component = Component;
  static createElement = createElement
  static Fragment = Fragment
}

export default Dom;

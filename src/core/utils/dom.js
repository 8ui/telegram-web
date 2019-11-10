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

class Component {
  constructor(props) {
    this.props = {...this.defaultProps, ...(props || {})};
  }

  componentDidMount() { }

  componentWillmount() { }

  componentWillUnmount() { }

  shouldComponentUpdate() { return true }

  componentWillUpdate() { }

  componentDidUpdate() {
    console.log('updated', this.name);
  }

  draw = (update = false) => {
    const elem = this.render();
    if (this.elem) {
      this.elem.replaceWith(elem);
    }
    this.elem = elem;
    this.componentWillmount()
    setTimeout(this.componentDidMount.bind(this))
    return this.elem;
  }

  redraw = (nextProps, nextState) => {
    if (this.shouldComponentUpdate(nextProps, nextState)) {
      this.componentWillUpdate(nextProps, nextState);

      this.props = nextProps;
      this.state = nextState;

      this.draw(true);

      this.componentDidUpdate(nextProps, nextState);
    } else {
      this.props = nextProps;
      this.state = nextState;
    }
  }

  setState = (data, fn) => {
    console.log('setState', data, !!fn);
    const state = typeof data === 'function'
      ? data(this.state) : data

    const nextState = { ...this.state, ...state };

    if (fn) {
      fn(nextState);
    }
    this.redraw(this.props, nextState);
  }
}
Component.defaultProps = {}


const renderDom = (id, component) => {
  const d = new component()
  const el = document.getElementById(id);
  el.replaceWith(d.draw());
}

const setAttribute = (el, key, value) => {
  if (value === null) {

  } else if (typeof value === 'object') {
    Object.keys(value).forEach(k => {
      el[key][k] = value[k];
    })
  } else {
    el.setAttribute(key === 'className' ? 'class' : key, value)
  }
}

const createElement = (tag, attrs, ...children) => {
  if (typeof tag === 'function') {
    const props = {...(tag.defaultProps || {}), ...(attrs || {}), children: (children.length ? children : undefined)}
    if (tag.prototype instanceof Component) {
      const child = new tag(props);
      return child.draw();
    } else {
      return tag(props);
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

    children.flat().forEach(item => {
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

const Fragment = () => {
  return null;
}

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
  static createElement = createElement
  static Fragment = Fragment
}

export default Dom;

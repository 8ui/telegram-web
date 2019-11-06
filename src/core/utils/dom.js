const addEventListener = (el, name, fn) => {
  el.addEventListener(
    name.replace(/^on/, '').toLowerCase(),
    fn,
    false
  );
}

class Component {

}

const renderDom = (id, component) => {
  const d = new component()
  const el = document.getElementById(id);
  el.appendChild(d.render());
}

const createElement = (tag, attrs, ...children) => {
  if (typeof tag === 'function') {
    const child = new tag();
    if (child instanceof Component) {
      return child.render();
    }
  }

  if (tag) {
    const el = document.createElement(tag);

    if (attrs && typeof attrs === 'object') {
      console.log(attrs);
      Object.keys(attrs).forEach(attr => {
        if (typeof attrs[attr] === 'function') {
          addEventListener(el, attr, attrs[attr]);
        } else {
          el.setAttribute(attr === 'className' ? 'class' : attr, attrs[attr])
        }
      })
    }

    children.forEach(item => {
      if (typeof item === 'string') {
        el.innerHTML += item;
      } else if (item) {
        el.appendChild(item)
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import routes from 'routes';

import styles from './menu.styles.pcss';


const links = [
  {
    label: 'Dashboard',
    to: routes.home(),
  },
  {
    label: 'Reports',
    to: routes.notFound(),
  },
];

class Menu extends Component {
  static item(link) {
    return (
      <li key={link.label} className={styles.item}>
        <NavLink
          to={link.to}
          exact
          activeClassName={styles.active}
        >
          {link.label}
        </NavLink>
      </li>
    );
  }

  render() {
    const { className } = this.props;

    const linkNodes = links.map((link) => {
      return Menu.item(link);
    });

    return (
      <ul className={classnames(styles.menu, className)}>
        {linkNodes}
      </ul>
    );
  }
}

Menu.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Menu;

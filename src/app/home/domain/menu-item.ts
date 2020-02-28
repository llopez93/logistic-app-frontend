import User from "../../core/domain/security/user";

export default class MenuItem {

  label: string;
  icon: string;
  route?: string;
  requiredRoles?: string[] = [];
  children?: MenuItem[] = [];

  constructor(item: Partial<MenuItem>, roles?: string[]) {
    Object.assign(this, item);
    // this.requiredRoles = roles.map(value => new Role({name: value}));
  }

  hasChildren(): boolean {
    return this.children != null && this.children.length > 0;
  }

  canBeShownUser(user: User): boolean {
    return this.requiredRoles.length === 0 ? true : this.requiredRoles.includes(user.role.name);
    /*
    if (this.hasChildren()) {
      return this.requiredRoles.includes(user.role.name);
    } else {
      const userRoles = user.roles.map(role => role.name);
      return this.requiredRoles.every(roleName => userRoles.includes(roleName));
    }
     */
  }

  static findRolesByRoute(route: string): string[] {
    const item = menuItems.find(item => item.route === route);
    if (item !== undefined) {
      return item.requiredRoles && item.requiredRoles.length > 0 ? item.requiredRoles : null;
    } else {
      return null;
    }
  }

  equals(other: MenuItem): boolean {
    return this.route != null ? this.route === other.route && other.label === this.label : other.label === this.label;
  }

}

export const menuItems = [
  new MenuItem({label: "Inicio", icon: "home", route: ""}),
  // new MenuItem({label: "Perfiles", icon: "people", route: "abogados-profiles"}),
  new MenuItem({
    label: "Administración", icon: "computer", children: [
      new MenuItem({label: "Usuarios", icon: "people_outline", route: "administration/users", requiredRoles: ["Administrador"]}),
      new MenuItem({label: "Roles", icon: "security", route: "administration/roles", requiredRoles: ["Administrador"]}),
    ]
  }),
  new MenuItem({label: "Camiones", icon: "directions_bus", route: "owners/trucks", requiredRoles: ["Administrador"]}),
  /**
   new MenuItem({
    label: "Formularios", icon: "description", children: [
      new MenuItem({label: "Dictámenes", icon: "library_books", route: "forms", requiredFxs: ['Form.FINDALL']}),
      new MenuItem({label: "Mis dictámenes", icon: "class", route: "forms/data", requiredFxs: ['FormData.GETUSERFORMSDATA']}),
    ]
  }),

   new MenuItem({
    label: "Vistas modelo", icon: "library_books", children: [
      new MenuItem({label: "Vistas modelo", icon: "description", route: 'view', requiredFxs: ['View.FINDALL']}),
      new MenuItem({label: "Vistas modelo completadas", icon: "class", route: "view/filled", requiredFxs: ['ViewData.FINDALL']}),
    ]
  }),

   new MenuItem({label: "Biblioteca", icon: "cloud", route: 'repository'}),
   new MenuItem({
    label: "Foro de consultas", icon: "forum", route: "post",
    requiredFxs: ['Topic.FINDBYNAME', 'Post.FINDBYTOPIC', 'Post.FINDLASTPOSTS']
  }),
   new MenuItem({label: "Mensajeria interna", icon: "mail", route: 'chat'}),
   new MenuItem({label: "Reportar errores", icon: "report", route: "report-errors"}),
   */
] as MenuItem[];

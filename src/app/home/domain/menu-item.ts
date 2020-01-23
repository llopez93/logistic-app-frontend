import User from "../../core/domain/user";

export default class MenuItem {

  label: string;
  icon: string;
  route?: string;
  requiredFxs?: string[] = [];
  children?: MenuItem[] = [];

  constructor(item: Partial<MenuItem>){
    Object.assign(this, item);
    if(this.hasChildren()){
      this.children.forEach(child => this.requiredFxs.push(...child.requiredFxs))
    }
  }

  hasChildren(): boolean {
    return this.children != null && this.children.length > 0;
  }

  canBeShownUser(user: User): boolean{
    if(this.hasChildren()) {
      return user.fxs.some(userFX => this.requiredFxs.includes(userFX.fxname));
    } else {
      const userFXS = user.fxs.map(fx => fx.fxname);
      return this.requiredFxs.every(fx => userFXS.includes(fx));
    }
  }

  static findFXSByRoute(route: string): string[] {
    const item = menuItems.find(item => item.route === route);
    if(item != undefined){
      return item.requiredFxs && item.requiredFxs.length > 0 ? item.requiredFxs : null;
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
  new MenuItem({label: "Perfiles", icon: "people", route: "abogados-profiles"}),
  new MenuItem({label: "Administracion", icon: "computer", children: [
      new MenuItem({label: "Usuarios", icon: "people_outline", route: "users", requiredFxs: ["User.FIND"]}),
      new MenuItem({label: "Roles", icon: "security", route: "role", requiredFxs: ['Role.FINDALL']}),
      new MenuItem({label: "Ministerios", icon: "business", route: "ministry", requiredFxs: ['Ministry.FINDALL']}),
      new MenuItem({label: "Tópicos", icon: "stars", route: "topic",
        requiredFxs: ['Topic.FINDALL', 'Topic.FIND', 'Topic.DELETE', 'Topic.UPDATE']}),
      new MenuItem({label: "Solicitudes de registro", icon: "person_add", route: "user-requests",
        requiredFxs: ['UserRequest.GETALL', 'UserRequest.REJECTREQUEST', 'UserRequest.APPROVEREQUEST']}),

  ]}),

  new MenuItem({label: "Formularios", icon: "description", children: [
      new MenuItem({label: "Dictámenes", icon: "library_books", route: "forms", requiredFxs: ['Form.FINDALL']}),
      new MenuItem({label: "Mis dictámenes", icon: "class", route: "forms/data", requiredFxs: ['FormData.GETUSERFORMSDATA']}),
  ]}),

  new MenuItem({label: "Vistas modelo", icon: "library_books", route: "", children: [
      new MenuItem({label: "Vistas modelo", icon: "description", route: 'view', requiredFxs: ['View.FINDALL']}),
      new MenuItem({label: "Vistas modelo completadas", icon: "class", route: "view/filled", requiredFxs: ['ViewData.FINDALL']}),
  ]}),

  new MenuItem({label: "Biblioteca", icon: "cloud", route: 'repository'}),
  new MenuItem({label: "Foro de consultas", icon: "forum", route: "post",
    requiredFxs: ['Topic.FINDBYNAME', 'Post.FINDBYTOPIC', 'Post.FINDLASTPOSTS']}),
  new MenuItem({label: "Mensajeria interna", icon: "mail", route: 'chat'}),
  new MenuItem({label: "Reportar errores", icon: "report", route: "report-errors"}),

] as MenuItem[];

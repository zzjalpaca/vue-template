const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  permissionRoutes: state => state.permission.routes,
  asyncRoutes: state => state.permission.addRoutes,
  navMenu: state => state.app.navMenu
}
export default getters

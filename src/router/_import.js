export default file => {
  return map[file] || null
}

// id和页面相对应，为拼接动态路由做准备
const map = {
  // 数据洞察，小程序洞察
  '3': () => import('@/layout'),
  '2': () => import('@/layout'),
  '189': () => import('@/views/dataInsight'),
  '213': () => import('@/views/dataInsight'),
  '184': () => import('@/views/dataInsight'),
  '179': () => import('@/views/dataInsight'),
  '208': () => import('@/views/dataInsight'),

  // 小程序总览
  '180': () => import('@/views/dataInsight/adDataList/outsideEffect'),
  '181': () => import('@/views/dataInsight/adDataList/outsideProfit'),
  '182': () => import('@/views/dataInsight/adDataList/moneyAnalysis'),
  '183': () => import('@/views/dataInsight/adDataList/innerEffect'),
  '252': () => import('@/views/dataInsight/adDataList/platConsume'),
  '256': () => import('@/views/dataInsight/adDataList/noRelation'),
  '257': () => import('@/views/dataInsight/adDataList/noData'),

  // 数据资产
  '170': () => import('@/views/dataAssets'),
  '137': () => import('@/views/dataAssets'),
  '150': () => import('@/views/dataAssets'),
  '159': () => import('@/views/dataAssets'),

  '174': () => import('@/views/dataAssets/leadManagement/cityLeadManage'),
  '173': () => import('@/views/dataAssets/leadManagement/buildLeadManage'),
  '172': () => import('@/views/dataAssets/leadManagement/leadsOverview'),
  '171': () => import('@/views/dataAssets/leadManagement/detailedManagement'),

  '169': () => import('@/views/dataAssets/dataImport/dataImport'),
  '175': () => import('@/views/dataAssets/dataImport/backflow'),
  '176': () => import('@/views/dataAssets/dataImport/contractBack'),
  '177': () => import('@/views/dataAssets/dataImport/backflowNoData')
}

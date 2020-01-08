import Layout from '@/layout'

// 数据资产
const dataInsightRouter = {
  path: '/dataInsight',
  component: Layout,
  redirect: 'dataInsight',
  name: 'dataInsight',
  meta: { title: '数据洞察', icon: 'form' },
  children: [
    {
      path: 'miniProgram',
      name: 'miniProgram',
      component: () => import('@/views/dataInsight'),
      meta: { title: '小程序洞察' },
      children: [
        {
          path: 'miniProgram',
          name: 'miniProgramOverview',
          component: () =>
            import('@/views/dataInsight/miniProgram/miniProgram'),
          meta: { title: '小程序总览' }
        },
        {
          path: 'city',
          name: 'city2',
          component: () => import('@/views/dataInsight/miniProgram/city'),
          meta: { title: '城市洞察' }
        }
      ]
    },
    {
      path: 'adInsight',
      name: 'adInsight',
      component: () => import('@/views/dataInsight'),
      meta: { title: '广告洞察' },
      children: [
        {
          path: 'adOverview',
          name: 'adOverview',
          component: () => import('@/views/dataInsight/adInsight/adOverview'),
          meta: { title: '广告总览' }
        },
        {
          path: 'cityInsight',
          name: 'cityInsight',
          component: () => import('@/views/dataInsight/adInsight/cityInsight'),
          meta: { title: '城市洞察' }
        },
        {
          path: 'productInsight',
          name: 'productInsight',
          component: () => import('@/views/dataInsight/adInsight/productInsight'),
          meta: { title: '产品洞察' }
        },
        {
          path: 'platformInsight',
          name: 'platformInsight',
          component: () => import('@/views/dataInsight/adInsight/platformInsight'),
          meta: { title: '投放平台洞察' }
        }
      ]
    },
    {
      path: 'trafficInsight',
      name: 'trafficInsight',
      component: () => import('@/views/dataInsight'),
      meta: { title: '流量洞察' },
      children: [
        {
          path: 'trafficOverview',
          name: 'trafficOverview',
          component: () =>
            import('@/views/dataInsight/trafficInsight/trafficOverview'),
          meta: { title: '流量总览' }
        },
        {
          path: 'city',
          name: 'city1',
          component: () => import('@/views/dataInsight/trafficInsight/city'),
          meta: { title: '城市洞察' }
        }
      ]
    },
    {
      path: 'adDataList',
      name: 'adDataList',
      component: () => import('@/views/dataInsight'),
      meta: { title: '广告数据报表' },
      children: [
        {
          path: 'outsideEffect',
          name: 'outsideEffect',
          component: () =>
            import('@/views/dataInsight/adDataList/outsideEffect'),
          meta: { title: '站外广告投放效果分析' }
        },
        {
          path: 'outsideProfit',
          name: 'outsideProfit',
          component: () =>
            import('@/views/dataInsight/adDataList/outsideProfit'),
          meta: { title: '站外广告城市利润分析' }
        },
        {
          path: 'moneyAnalysis',
          name: 'moneyAnalysis',
          component: () =>
            import('@/views/dataInsight/adDataList/moneyAnalysis'),
          meta: { title: '投放平台消耗金额分析' }
        },
        {
          path: 'innerEffect',
          name: 'innerEffect',
          component: () => import('@/views/dataInsight/adDataList/innerEffect'),
          meta: { title: '站内广告投放效果分析' }
        }
      ]
    }
  ]
}

export default dataInsightRouter

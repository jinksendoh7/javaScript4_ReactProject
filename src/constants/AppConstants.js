export const RoutesConst = {
    HOME_ROUTE: '/',
    LOGIN_ROUTE: '/login',
    SIGNUP_ROUTE: '/signup',
    ADMIN_ROUTE: '/admin',
    ABOUT_ROUTE: '/about',
    ADMIN_DASHBOARD_ROUTE: 'dashboard',
    ADMIN_INVENTORY_ROUTE: 'vehicles',
    ADMIN_VISITS_ROUTE: 'visits',
    VIEW_DETAIL_PAGE_ROUTE: 'view/:id',
    
}

export const AppNumberConst = {
    LOW_MILEAGE: 200000,
    TIMEOUT_SEC: 1000,
}
export const AppTextConst = {
    companyName: 'Advantage Auto Sales',
    BUILD_YOUR_DEAL_TEXT: 'BUILD YOUR DEAL.',
    BUILD_YOUR_DEAL_DESCRIPTION: ' Customize your payment terms according to your preference, then save it and a sales representative will contact you.',
    INITIAL_STATUS: 'Open',
    UNASSIGNED: 'Unassigned',
  }
export const FinanceConst = {
    finance_fee: 195.00,
    tax: 13,
    apr: 7.99,
    payments:{
      monthly: {
        numberPayments: 72,
        periodicPayments: 12,
      },
      bi_weekly: {
        numberPayments: 156,
        periodicPayments: 26,
      },
      weekly:{
        numberPayments: 312,
        periodicPayments: 52,
      }
    }
}

export const FireStoreConst = {
    TEAM_DOC: 'TeamData',
    INVENTORY_VEHICLES: 'InventoryVehicles',
    CUSTOMER_DEALS: 'CustomerDeals'
}
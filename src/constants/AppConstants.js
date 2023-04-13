export const RoutesConst = {
    HOME_ROUTE: '/',
    LOGIN_ROUTE: '/login',
    SIGNUP_ROUTE: '/signup',
    ADMIN_ROUTE: '/admin',
    ABOUT_ROUTE: '/about',
    ADMIN_DASHBOARD_ROUTE: 'dashboard',
    ADMIN_INVENTORY_ROUTE: 'vehicles',
    ADMIN_CUSTOMERS_ROUTE: 'customers',
    ADMIN_VISITS_ROUTE: 'visits',
    VIEW_DETAIL_PAGE_ROUTE: 'view/:id',
    ADMIN_VIEW_DEALS_ROUTE: 'customers/:vehicleId'
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
    DEAL_CREATED: 'Customer created a deal.',
    DEAL_REVISED: 'Deal was revised by Sales',
    DEAL_ACCEPTED_BY_SALES: 'Deal was accepted by Sales. Awaiting for customer response.',
    DEAL_CLOSED: 'Closed Deal. Customer Accepted the deal'
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
    CUSTOMER_DEALS: 'CustomerDeals',
    LOGS_CUSTOMER_DEALS: 'LogsCustomerDeals',
}
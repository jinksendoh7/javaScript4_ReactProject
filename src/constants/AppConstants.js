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
    CUSTOMER_DEALS: 'CustomerDeals',
    USER_DOC: 'users'
}

export const ErrorMessageConst = {
  INVALID_PASSWORD_LENGTH: 'Password length must be greater than 5 characters',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
  INVALID_CREDENTIALS: 'Invalid Credentials',
  INVALID_EMAIL_PASSWORD: 'Please enter a valid email and password',
  NAME_NOT_ENTERED: 'Please fill in the required name fields',
  ERROR_USER_ADD: 'Error adding user: ',

}

export const SuccessMessageConst = {
    WELCOME_MESSAGE: 'Welcome to Advanatage Auto Sales',
    CONSOLE_LOG_ADD_USER: 'User added to the database with ID: ',
}
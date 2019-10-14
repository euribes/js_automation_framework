module.exports = {
    //login page
    usernameInput: 'user_email',
    passwordInput: 'user_password',
    sign_in_btn: 'commit',
    
    //home page
    banner: '.flash_notice',
    logo: 'logo',
    user_information: '#user_information > span',

    //employee page
    employee_first_name: 'employee_first_name',
    employee_last_name: 'employee_last_name',
    employee_email: 'employee_email',
    employee_identification: 'employee_identification',
    employee_leader_name: 'employee_leader_name',
    employee_start_date_year: 'employee_start_working_on_1i',
    employee_start_date_month: 'employee_start_working_on_2i',
    employee_start_date_day: 'employee_start_working_on_3i',
    employee_submit: '#new_employee > div.actions > input[type=submit]',
    employee_page: '#content > h1',
    employees_page_link: '#menu > li.selected > a',
    new_employee_page: '#content > p > a',
    employees_table: '#content > table',
    employees_table_rows: '#content > table > tbody > tr',
    employee_number: '#content > a',
    delete_employee: employee => `//*[@id='content']/table/tbody/tr//td//a[contains(@href,'${employee}') and contains(text(),'Delete')]`
}
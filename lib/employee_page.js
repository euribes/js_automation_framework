let Page = require('./base_page');
const locator = require('../utils/locators');
const data = require('../utils/data');
const faker = require('../utils/fake_data');
const employeeFirstNameSelectorId = locator.employee_first_name;
const employeeLastNameSelectorId = locator.employee_last_name;
const employeeMailSelectorId = locator.employee_email;
const employeeIdentificationSelectorId = locator.employee_identification;
const employeeLeaderNameSelectorId = locator.employee_leader_name;
const employeeStartDateYearSelectorId = locator.employee_start_date_year;
const employeeStartDateMonthSelectorId = locator.employee_start_date_month;
const employeeStartDateDaySelectorId = locator.employee_start_date_day;
const employeeSubmit = locator.employee_submit;
const newEmployee = data.new_user_name;
const newEmployeeLastName = data.new_user_last_name;
const newEmployeeId = data.new_user_id;
const newEmployeeYear = data.new_user_date_year;
const newEmployeeMonth = data.new_user_date_month;
const newEmployeeDay = data.new_user_date_day;
const newEmployeeLead = data.new_user_lead;
const fakeEmail = faker.fake_email;
const employeePage = locator.employee_page;
const newEmployeePage = locator.new_employee_page;
const allEmployeesTableRows = locator.employees_table_rows;
const employeePageLink = locator.employees_page_link;
const employeeNumber = locator.employee_number;


let employeeFirstName, employeeLastName, employeeMail, employeeIdentification, employeeLeaderName, employeeStartDateYear, employeeStartDateMonth, employeeStartDateDay, tmpEmployee;

Page.prototype.goToEmployeesPage = async function() {
    employeeP = await this.findByCss(employeePageLink);
    await employeeP.click();
};

Page.prototype.goToNewEmployeePage = async function() {
    newEmployeeP = await this.findByCss(newEmployeePage);
    await newEmployeeP.click();
    ePage = await this.findByCss(employeePage);
    const result = await this.driver.wait(async function () {
        const employeeText = await ePage.getText();
        return {
            employee_text: employeeText
        }
    }, 5000);
    return result;
};

Page.prototype.createNewEmployee = async function() {
    employeeFirstName = await this.findById(employeeFirstNameSelectorId);
    employeeLastName = await this.findById(employeeLastNameSelectorId);
    employeeMail = await this.findById(employeeMailSelectorId);
    employeeIdentification = await this.findById(employeeIdentificationSelectorId);
    employeeLeaderName = await this.findById(employeeLeaderNameSelectorId);
    employeeStartDateYear = await this.findById(employeeStartDateYearSelectorId);
    employeeStartDateMonth = await this.findById(employeeStartDateMonthSelectorId);
    employeeStartDateDay = await this.findById(employeeStartDateDaySelectorId);
    employeeSubmitButton = await this.findByCss(employeeSubmit);
    await this.write(employeeFirstName, newEmployee);
    await this.write(employeeLastName, newEmployeeLastName);
    await this.write(employeeMail, fakeEmail);
    await this.write(employeeIdentification, newEmployeeId);
    await this.write(employeeLeaderName, newEmployeeLead);
    await this.write(employeeStartDateYear, newEmployeeYear);
    await this.write(employeeStartDateMonth, newEmployeeMonth);
    await this.write(employeeStartDateDay, newEmployeeDay);
    await employeeSubmitButton.click();
    var tmp = await this.getCurrentEmployee(employeeNumber);
    tmpEmployee = tmp.toString().split('/')[4];
};

Page.prototype.checkUserExists = async function() {
    await this.goToEmployeesPage();
    employeesRows = await this.findElementRow(allEmployeesTableRows);
    const result = await this.driver.wait(async function () {
        console.log("The row of the user just added is " + employeesRows.id[0]);
        return {
            employees: employeesRows.id[0]
        }
    }, 5000);
    return result;
};

Page.prototype.deleteUser = async function() {
    await this.goToEmployeesPage();
    var delete_EmployeeSelectorXpath = locator.delete_employee(tmpEmployee);
    deleteEmployee = await this.deleteEmployee(delete_EmployeeSelectorXpath);
};

module.exports = Page;
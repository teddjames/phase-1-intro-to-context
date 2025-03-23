// Your code here
// 1. Create an employee record from an array
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// 2. Create employee records from an array of arrays
function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

// 3. Add a TimeIn event to an employee record
function createTimeInEvent(employee, dateStamp) {
  // dateStamp should be "YYYY-MM-DD HHMM"
  let [date, hour] = dateStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employee;
}

// 4. Add a TimeOut event to an employee record
function createTimeOutEvent(employee, dateStamp) {
  // dateStamp should be "YYYY-MM-DD HHMM"
  let [date, hour] = dateStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employee;
}

// 5. Calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find((event) => event.date === date);
  const timeOut = employee.timeOutEvents.find((event) => event.date === date);
  if (timeIn && timeOut) {
    // The hours are stored as "HHMM", so subtract and divide by 100.
    return (timeOut.hour - timeIn.hour) / 100;
  }
  return 0;
}

// 6. Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
  const hours = hoursWorkedOnDate(employee, date);
  return hours * employee.payPerHour;
}

// 7. Aggregate wages for all dates for an employee
function allWagesFor(employee) {
  // Get all unique dates from timeInEvents
  const dates = employee.timeInEvents.map((event) => event.date);
  return dates.reduce(
    (total, date) => total + wagesEarnedOnDate(employee, date),
    0
  );
}

// 8. Calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(
    (total, employee) => total + allWagesFor(employee),
    0
  );
}

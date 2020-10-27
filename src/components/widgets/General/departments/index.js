import React from 'react'

class Departments extends React.Component {
  render() {
    const { length } = this.props
    return (
      <div className="d-flex flex-wrap align-items-center">
        <div className="mr-auto">
          <p className="text-uppercase text-dark font-weight-bold font-size-18 mb-1">
            หน่วยงานทั้งหมด
          </p>
          {/* <p className="text-gray-5 mb-0">Average Weekly Profit</p> */}
        </div>
        <p className="text-success font-weight-bold font-size-24 mb-0">
          {length.toLocaleString()} หน่วยงาน
        </p>
      </div>
    )
  }
}

export default Departments

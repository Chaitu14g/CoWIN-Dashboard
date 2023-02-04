import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

const apiStatusValues = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusValues.initial,
    newUpdatedFetchedData: '',
  }

  componentDidMount() {
    this.getDataDetails()
  }

  getDataDetails = async () => {
    this.setState({
      apiStatus: apiStatusValues.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedFetchedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination,
        vaccinationByAge: fetchedData.vaccination_by_age,
        vaccinationByGender: fetchedData.vaccination_by_gender,
      }
      const updatedLast7DaysVaccination = updatedFetchedData.last7DaysVaccination.map(
        eachItem => this.last7DaysVaccinationFunction(eachItem),
      )
      const newUpdatedFetchedData = {
        updatedLast7DaysVaccination,
        vaccinationByAge: [...updatedFetchedData.vaccinationByAge],
        vaccinationByGender: [...updatedFetchedData.vaccinationByGender],
      }
      this.setState({
        apiStatus: apiStatusValues.success,
        newUpdatedFetchedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusValues.failure,
      })
    }
  }

  last7DaysVaccinationFunction = eachItem => ({
    vaccineDate: eachItem.vaccine_date,
    dose1: eachItem.dose_1,
    dose2: eachItem.dose_2,
  })

  renderDataListViews = () => {
    const {newUpdatedFetchedData} = this.state
    return (
      <div className="totalChartsContainer">
        <VaccinationCoverage newUpdatedFetchedData={newUpdatedFetchedData} />
        <VaccinationByGender newUpdatedFetchedData={newUpdatedFetchedData} />
        <VaccinationByAge newUpdatedFetchedData={newUpdatedFetchedData} />
      </div>
    )
  }

  renderLoadingViews = () => (
    <div data-testid="loader" className="totalChartsContainer failureContainer">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureViews = () => (
    <div className="totalChartsContainer failureContainer">
      <img
        alt="failure view"
        className="failureImage"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1 className="failureHeading">Something went wrong</h1>
    </div>
  )

  renderAllDataViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusValues.success:
        return this.renderDataListViews()
      case apiStatusValues.failure:
        return this.renderFailureViews()
      case apiStatusValues.inProgress:
        return this.renderLoadingViews()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="mainHeightContainer">
        <div className="mainBackgroundContainer">
          <div className="navContainer">
            <img
              alt="website logo"
              className="navImage"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            />
            <h1 className="navHeading">Co-WIN</h1>
          </div>
          <h1 className="mainHeading">CoWIN vaccination in India</h1>
          {this.renderAllDataViews()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard

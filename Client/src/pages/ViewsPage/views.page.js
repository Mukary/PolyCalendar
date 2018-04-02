import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import autoBind from 'react-autobind'
import PNavbar from '../../components/Navbar/Navbar'
import ViewThumbnail from '../../components/ViewThumbnail/ViewThumbnail'
import {getUserViews, addViewDistant} from '../../services/User.services'
import {fetchViews, addView} from '../../actions/index'

class ViewsPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false,
      displayViewForm: false
    }
    autoBind(this)
  }

  componentWillMount() {
    const token = window.localStorage.getItem('pcal_token')
    if(token){
      this.setState({
        isLogged: true
      })
      getUserViews().then(views => {
        fetchViews(views)
      })
    }
  }

  displayViewForm(){
    this.setState({
      displayViewForm: !this.state.displayViewForm
    })
  }

  addView() {
    const title = this.title.value
    const color = this.color.value
    addViewDistant({
      title: title,
      color: color
    }).then(view => {
      addView({
        title:title,
        color:color
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    if(this.state.isLogged){
      return(
        <div>
        <PNavbar/>
        <button onClick={this.displayViewForm}>Add View</button>
        {
          this.state.displayViewForm 
          ?
          <div>
           <input ref={e => {this.title = e}}></input>
           <input ref={e => {this.color = e}}></input>
           <button onClick={this.addView}>Create</button>
          </div> : null
        }
        {
          this.props.views.map(view => {
            return(
              <ViewThumbnail title={view.title} color={view.color} />
            )
          })
        }
        </div>
      )
    } else {
      return(
        <Redirect to={'/login'} />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    views: state.items.views
  }
}


export default connect(mapStateToProps)(ViewsPage)
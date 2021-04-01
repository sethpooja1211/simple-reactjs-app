import React, {Component} from 'react';
import axios from 'axios';
import './index.css';

export default class ProductDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      filterArr: [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
      launch_success: true,
      land_success: true,
    }
    this.handleFilterClick = this.handleFilterClick.bind(this);
  }

  //Function which is called when the component loads for the first time
  componentDidMount() {
    axios.get('https://api.spaceXdata.com/v3/launches?limit=100').then(response => {
      this.setState({productList: response.data})
    }).catch(error => console.error(error));
  }

  //Function which is called whenver the component is updated
  componentDidUpdate(prevProps) {
  }

  getproductDetails = (name, value) => {
    const { launch_success, land_success} = this.state;
  
    if (name === 'year') {
      axios.get(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launch_success}&land_success=${land_success}&launch_year=${value}`).then(response => {
      this.setState({productList: response.data});
      this.props.history.push(`/productlist?launch_success=${launch_success}&land_success=${land_success}&launch_year=${value}`);
    }).catch(error => console.error(error));
    }
    if (name === 'launch') {
      axios.get(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${value}`).then(response => {
        this.setState({productList: response.data})
      }).catch(error => console.error(error));
    } 
    if (name === 'land') {
      axios.get(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launch_success}&land_success=${value}`).then(response => {
        this.setState({productList: response.data})
      }).catch(error => console.error(error));
    } 
    
  }

  handleFilterClick(event, name, value) {
    event.target.parentElement.querySelectorAll( ".filter_icon" ).forEach( e =>
      e.style.backgroundColor = ''
      );
    event.target.style.backgroundColor = '#1cb02a';
    if (name === 'year') {
      this.setState({ selected_yr: value, current_id: event.target });
      this.getproductDetails(name, value);
      
    }
    if (name === 'launch') {
      this.setState({ launch_success: value });
      this.getproductDetails(name, value);
      this.props.history.push(`/productlist?launch_success=${value}`)
    }
    if (name === 'land') {
      this.setState({ land_success: value });
      this.getproductDetails(name, value);
      this.props.history.push(`/productlist?land_success=${value}`)
    } 
  };

  render() {
    const { filterArr, productList } = this.state;
    if (!productList)
      return (<p>Loading Data</p>)
    return (
      <React.Fragment>
        <h1 className="title_heading">SpaceEx Launch programs</h1>
        <div className="container">
        <div className="nav">
          <span>Filters</span>
          <div className="filt_layout">
            <p className="filter_heading">Launch Year</p>
            {filterArr.map((dat_filter, index) => {
              return (<div className="filter_icon" style={{backgroundColor: '#b2f1b9'}} id={`filter_icon${index}`} key={index} onClick={(e) => this.handleFilterClick(e,'year', dat_filter)}>{dat_filter}</div>)
            })
            }
            <p className="filter_heading">Successful Launch</p>
            <div className="filter_icon" id="launch_1" style={{backgroundColor: '#b2f1b9'}} onClick={(e) => this.handleFilterClick(e,'launch',true)}>True</div>
            <div className="filter_icon" id="launch_2" style={{backgroundColor: '#b2f1b9'}} onClick={(e) => this.handleFilterClick(e,'launch',false)}>False</div>
            <p className="filter_heading">Successful Landing</p>
            <div className="filter_icon" id="land_1" style={{backgroundColor: '#b2f1b9'}} onClick={(e) => this.handleFilterClick(e,'land',true)}>True</div>
            <div className="filter_icon" id="land_2" style={{backgroundColor: '#b2f1b9'}} onClick={(e) => this.handleFilterClick(e,'land',false)}>False</div>
         </div>
        </div>
        <div className="cards">
         {productList && productList.map(function(product, index){
            return (
             <div className="card" key={index}>
               <div className="icon">
                 <img src={product.links.mission_patch_small} alt={product.details} />
                </div>
               <div className="detail_view">
                  <div className="title_color">{product.mission_name} #{product.flight_number}</div>
                  <div>
                    <p>Mission Ids:</p>
                    <ul>
                      {product.mission_id.map((el, key) => <li className="crd_textR" key={key}>{el}</li>)}
                    </ul>
                  </div>
                  <div className="crd_sr"> <div>Launch year:</div> <div className="crd_textR">&nbsp;{product.launch_year}</div></div>
                  <div> <p>Successful Launch: {product.launch_success.toString()}</p></div>
                  <div> <p>Successful landing: { product.launch_success.toString() }</p> </div>
               </div>
             </div>
            )
         })}
      </div>
      </div>
      </React.Fragment>
    )
  }
}

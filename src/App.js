import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import Home from './container/home';
import Create from './container/create';
import {testCategories, testItems} from './testData';
import {flattenArr, ID, parseToYearAndMonth} from './utility';

export const AppContext = React.createContext();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      items:flattenArr(testItems),
      categories:flattenArr(testCategories)
    }
    this.actions = {
      deleteItem: (item) => {
        delete this.state.items[item.id]
        this.setState({
          items : this.state.items
        })
        console.log(this.state.items);
      },
      createItem: (data, categoryId) => {
        const newId = ID()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestanp = new Date(data.date).getTime()
        const newItem = {...data, id:newId, cid:categoryId}
        this.setState({
          items:{...this.state.items, [newId]:newItem}
        })
        console.log(newItem);
        return newItem;
      },
      updateItem:(item, updateCategoryId) => {
        const modifiedItem = {
          ...item,
          cid: updateCategoryId,
          timestanp:new Date(item.date).getTime()
        }
        this.setState({
          items:{...this.state.items, [modifiedItem.id]:modifiedItem}
        })
      }
    }
  }
  render() {
    return (
      <AppContext.Provider value={{
          state:this.state,
          actions:this.actions,
      }}>
        <Router>
          <div>
            <ul>
              <Link to='/'>home </Link>
              <Link to='/create'>create </Link>
              <Link to='/edit/:id'>edit</Link>
            </ul>
            <div className='container pb-5'>
              <Route path='/create' component={Create}/>
              <Route path='/' exact component={Home}/>
              <Route path='/edit/:id' component={Create}/>
            </div>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;

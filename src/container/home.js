import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Ionicon from 'react-ionicons';
import PriceList from '../components/priceList';
import ViewTab from '../components/viewTab';
import {LIST_VIEW, GRAPH_VIEW, padLeft, parseToYearAndMonth, TYPE_INCOME, TYPE_OUTCOME} from '../utility';
import TotalPrice from '../components/totalPrice';
import MonthPicker from '../components/monthPicker';
import CreateBtn from '../components/createBtn';
import PriceForm from '../components/priceForm';
import {Tabs, Tab} from '../components/tabs';
import withContext from '../withContext';
import {testCategories, testItems} from '../testData';

const tabsText = [LIST_VIEW, GRAPH_VIEW]
class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      testItems,
      testCategories,
      currentDate:parseToYearAndMonth(),
      tabView:tabsText[0]
    }
  }
  changeDate = (year, month) => {
    this.setState({
      currentDate:{year, month}
    })
  }
  changeView = (index) => {
    this.setState({
      tabView:tabsText[index]
    })
  }
  createItem = () => {
    this.props.history.push('/create')
  }
  modifyItem = (item) => {
    this.props.history.push(`/edit/${item.id}`)
  }
  deleteItem = (deleteItem) => {
    this.props.actions.deleteItem(deleteItem);
  }
  render() {
    const {data} = this.props;
    const {items,categories} = data;
    const {currentDate, tabView} = this.state;
    let totalIncome=0, totalOutcome=0;
    const itemsWithCategories = Object.keys(items).map(id => {
      items[id].category = testCategories[items[id].cid];
      return items[id];
    }).filter(item=>{
      return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
    })
    itemsWithCategories.forEach(item => {
      item.category.type===TYPE_INCOME?
      totalIncome += item.price : totalOutcome += item.price
    })
    return (
      <React.Fragment>
        <header class='App-header-new'>
          <div className='row'>
            <div className='col'>
              <MonthPicker
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.changeDate} />
            </div>
            <div className='col'>
              <TotalPrice income={totalIncome} outcome={totalOutcome} />
            </div>
          </div>
        </header>
        <div className='content-area py-3 px-3'>
          <Tabs activeIndex={0} onTabChange={this.changeView}>
            <Tab>
              <Ionicon className = "rounded-circle"
                icon="ios-paper"
                fontSize="30px"
                color={"#007bbf"}>
              </Ionicon>list
            </Tab>
            <Tab>
              <Ionicon className = "rounded-circle"
                icon="ios-pie"
                fontSize="30px"
                color={"#007bbf"}>
              </Ionicon>graph
            </Tab>
          </Tabs>

          <CreateBtn onCreateItem={this.createItem}/>
          {
            tabView===LIST_VIEW &&
            <PriceList items={itemsWithCategories}
              onModifyItem={this.modifyItem}
              onDeleteItem={this.deleteItem}
            />
          }
          {
            tabView===GRAPH_VIEW &&
            <h1>This is graph</h1>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withContext(Home));

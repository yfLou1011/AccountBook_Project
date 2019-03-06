import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import PriceForm from '../components/priceForm';
import {Tabs, Tab} from '../components/tabs';
import CategotySelect from '../components/categorySelect';
import {testCategories} from '../testData';
import {TYPE_INCOME,TYPE_OUTCOME} from '../utility';
import withContext from '../withContext'

const tabsText = [TYPE_OUTCOME, TYPE_INCOME]
class Create extends React.Component {
  constructor(props){
    super(props);
    const {id} = props.match.params;
    const {categories, items} = props.data;
    this.state = {
      selectedTab: (id && items[id])? categories[items[id].cid].type : TYPE_OUTCOME,
      selectedCategory:(id && items[id])? categories[items[id].cid] : null
    }
  }
  tabChange = (index) => {
    this.setState({
      selectedTab:tabsText[index]
    })
  }
  selectCategory = (category) => {
    this.setState({
      selectedCategory:category
    })
  }
  cancleSubmit = () => {
    this.props.history.push("/")
  }
  submitForm = (data, isEditMode) => {
    if(!isEditMode){
      this.props.actions.createItem(data, this.state.selectedCategory.id)
    }else{
      //update
      this.props.actions.updateItem(data, this.state.selectedCategory.id)
    }
    this.props.history.push("/")
  }
  render(){
    const {data} = this.props;
    const {items, categories} = data;
    const {id} = this.props.match.params;
    const editItem = (id && items[id])? items[id]:"";
    const { selectedTab, selectedCategory} = this.state
    const tabIndex = tabsText.findIndex(text => text === selectedTab);
    // change tab types
    const filterCategories = Object.keys(categories)
    .filter(id => categories[id].type === selectedTab)
    .map(id => categories[id]);
    return(
      <div className='create-page py-3 px-3 rounded my-3'style={{background:"#fff"}}>
        <Tabs activeIndex={tabIndex} onTabChange={this.tabChange}>
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
        <CategotySelect
          categories={filterCategories}
          onSelectCategory={this.selectCategory}
          selectedCategory={selectedCategory}
          />
        <br/>
        <PriceForm
          onFormSubmit={this.submitForm}
          onCancelSubmit={this.cancleSubmit}
          item={editItem}
        />
      </div>
    )
  }
}

export default withRouter(withContext(Create));

import React from 'react';
import {shallow} from 'enzyme';
import TotalPrice from '../totalPrice'

const props = {
  income:5200,
  outcome: 1390
}

describe('total price component', () => {
  it('hello', () => {
    const wrapper = shallow(<TotalPrice {...props}/>)
    expect(wrapper.find('.income span').text()*1).toEqual(5200)
    expect(wrapper.find('.outcome span').text()*1).toEqual(1390)
  })
})

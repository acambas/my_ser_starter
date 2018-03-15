import Counter from '../index'
import React from 'react'
import renderer from 'react-test-renderer'

test('Link changes the class when hovered', () => {
  const component = renderer.create(<Counter increment={100} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

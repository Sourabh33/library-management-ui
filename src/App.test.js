import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import ShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ShallowRenderer();
renderer.render(<App/>);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
console.log(result.props.children);
expect(result.props.children).toEqual([
  <span className="heading">Title</span>
]);

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

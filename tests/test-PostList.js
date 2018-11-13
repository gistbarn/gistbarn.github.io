import PostList from '../src/views/PostList.js';

const state = {
  apples: [{
    id: 'abc',
    description: 'An apple.',
    files: ['file1', 'fil2']
  }]
};

PostList(state, {type:'apples'}).to('.test', 'replace');


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from '../src/context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

Bugsnag.start({
  apiKey: '9ede7a73fd26502bc2269502043032e2',
  plugins: [new BugsnagPluginReact()]
})

const ErrorBoundary = Bugsnag.getPlugin('react')
  .createErrorBoundary(React)

Bugsnag.notify(new Error('Test error'))

ReactDOM.render(
  <ErrorBoundary>

  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>

  </ErrorBoundary>,
  document.getElementById('root')
);
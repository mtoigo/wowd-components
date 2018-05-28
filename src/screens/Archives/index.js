// @flow

import * as React from 'react';

import type { Show } from 'util/Types';
import { getAllShows } from 'util/ShowArchivesApi';
import Archives from './Archives';
import type { displayMode } from './Archives';

let promise;
// Fetch, transform, and cache archive summary
const getArchiveSummaries = (): Promise<Show[]> => {
  if (!promise) {
    promise = getAllShows();
  }
  return promise;
};
type State = {
  shows: ?Show[],
  display: displayMode
};

export default class ArchivesApp extends React.Component<void, State> {
  constructor(props: void) {
    super(props);
    this.state = {
      shows: null,
      display: 'schedule'
    };
  }

  componentDidMount() {
    getArchiveSummaries()
      .then(shows => {
        this.setState({ shows });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.shows) {
      return null;
    }

    return (
      <Archives
        shows={this.state.shows}
        display={this.state.display}
        onChangeDisplay={(display: displayMode) => this.setState({ display })}
      />

    );
  }
}
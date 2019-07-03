import { Grid, InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { ConvertToPatches, UIVersion } from 'evergreen.js/lib/models';
import * as React from 'react';
import * as rest from "../../rest/interface";
import '../../styles.css';
import Patch from './Patch';

interface State {
  versions: Record<string, UIVersion>
  visible: Record<string, UIVersion>
}

class Props {
  public client: rest.Evergreen;
}

export class PatchContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      versions: {},
      visible: {},
    };
  }

  public componentDidMount() {
    this.loadPatches();
  }

  public render() {

    const Patches = () => (
      <Grid className="patch-container" container={true} spacing={24}>
        {Object.keys(this.state.visible).map(versionId => (
          <Grid item={true} xs={12} key={versionId}>
            <Patch Patch={this.state.versions[versionId]} />
          </Grid>
        ))}
      </Grid>
    );

    return (
      <div>
        <div className="search-container">
          <Paper className="search-input" >
            <InputBase startAdornment={<SearchIcon />}
              fullWidth={true}
              placeholder="Search Patch Descriptions"
              onChange={this.search}
            />
          </Paper>
        </div>
        <Patches />
      </div>
    );
  }

  private loadPatches() {
    this.props.client.getPatches((err, resp, body) => {
      const versions = ConvertToPatches(JSON.stringify(resp.body)).VersionsMap
      this.setState({ 
        versions: versions, 
        visible: versions, 
      });
    }, this.props.client.username);
  }

  private search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;
    const filteredPatches = this.filterItems(query);
    this.setState({
      visible: filteredPatches,
    });
  }

  private filterItems(query: string) {
    const filtered = {};
    if (query === "") {
      return this.state.versions;
    }
    Object.keys(this.state.versions).map(versionId => {
      const patch = this.state.versions[versionId];
      const description = patch.Version.message;
      if (description.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        filtered[versionId] = patch;
      }
    });
    return filtered;
  }
}

export default PatchContainer;
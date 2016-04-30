/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator,
} from 'react-native';

var BASE_URL = "https://api.github.com/search/repositories?q=";


class ReactProject extends Component {
  getInitialState: function() {
        return {
          dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
        };
      },





  render() {
    if (this.state.dataSource.getRowCount() === 0) {
      console.log("yes");
    }
    var content = this.state.dataSource.getRowCount() === 0 ?
    <Text style={styles.blanktext}>
      please enter a search term to seee results.
    </Text> :
    <ListView
      ref="listview"
      dataSource={this.state.dataSource}
      renderRow={this.renderRow}
      automaticallyyAdjustContentInsets={false}
      keyboardDismissMode="onDrag"
      keyboardShouldPersistTaps={true}
      showsVerticalScrollIndicator={false}/>;

      return (
        <View style={styles.container}>
          <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search for a project..."
          style={styles.searchBarInput}
          onEndEditing={this.onSearchChange}
          />
          {content}
        </View>
          
      );
  },

  onSearchChange: function(event: Object) {
    var searchTerm = event.nativeEvent.text.toLowerCase();
    var queryURL = BASE_URL + encodeURIComponent(searchTerm);
    fetch(queryURL)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.items) {
          this.setState({
            dataSource: this.state.dataSource.
              cloneWithRows(reaponseData.items),
          });
        }
      }).done();
  },

  renderRow: function(repo: Object) {
    return (
      <View>
        <View style = {styles.row}>
          <Image
          source={{uri: repo.owner.avatar_url}}
          style={styles.profpic}
          />
          <View style={styles.textcontainer}>
            <Text style={styles.title}>{repo.name}</Text>
            <Text style={styles.subtitle}>{repo.owner.login}</Text>
          </View>
        </View>
        <View style={styles.cellBoorder} />
      </View>
      );
  },
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBarInput: {
    marginTop: 30,
    padding: 5,
    fontSize: 15,
    height: 30,
    backgroundColor: '#EAEAEA',
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  cellBorder: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 1,
    marginLeft: 4,
  },
  profpic: {
    width: 50,
    height: 50,
  },
  title： {
    fontSize： 20，
    marginBotton: 8,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize：16,
    marginBotton: 8,
  },
  textContainer: {
    paddingLeft: 10,
  },
  blanktext: {
    padding: 10,
    fontSize：20,
  }
});





AppRegistry.registerComponent('ReactProject', () => ReactProject);

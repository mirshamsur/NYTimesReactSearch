var React = require("react");

// Import the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var SavedArticle = require("./children/SavedArticle");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

var Main = React.createClass({

  getInitialState: function() {
    return { searchTerm: "", searchBegindate:"", searchEnddate:"", results: [], savedArticleList: [] };
  },

  componentDidMount: function() {
    this.getSavedArticles();
  },

  getSavedArticles: function() {
    helpers.getSaved().then(function(response) {
      if (response !== this.state.savedArticleList) {
        this.setState({ savedArticleList: response.data });
      }
    }.bind(this));
  },

  handleDeleteSavedArticle: function(article) {
      helpers.deleteSaved(article._id).then(function(data) {
        this.getSavedArticles();
      }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {
    
   if (this.state.searchTerm !== "") {

      var obj = {      
        term: this.state.searchTerm,
        begin_date: this.state.searchBegindate,
        end_date: this.state.searchEnddate
      };

      // Run the query for the user input values
      helpers.runQuery(obj).then(function(data) {
        if (data !== this.state.results) {
          this.setState({ results: data });
        } 
      }.bind(this));

      this.setState({searchTerm: ""});
   }

  },

  removeResult: function(url) {
    let indexToRemove = -1

    for (let i = 0; i < this.state.results.length; i++) {
      if (this.state.results[i].url === url) {
        indexToRemove = i
      }
    }
    this.state.results.splice(indexToRemove, 1)
    this.setState({ results: this.state.results})
    this.getSavedArticles();
  },
  
  setTerm: function(term, begin_date, end_date) {
    this.setState({ searchTerm: term });
    this.setState({ searchBegindate: begin_date });
    this.setState({ searchEnddate: end_date });
  },

  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">New York Times Search</h2>
          </div>
        </div>

        <div className="row">
          <Form setTerm={this.setTerm} />
        </div>

        <div className="row">
            <h5><strong>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {this.state.results.length ? "Search Results" : "" }
            </strong></h5>   
        </div>
        <div className="row">
          {this.state.results.map(function(res, i) {
            return (
              <Results removeResult={this.removeResult} articleInfo={res} key={i} />
            );
          }.bind(this))}
        </div>
        
        <div className="row">
          <div className="panel panel-default">
            <div className="panel-heading"><strong>Saved Article(s)</strong></div>
              <div className="panel-body">
              {this.state.savedArticleList.map(function(res2, i) {
                return (
                  <div className="panel panel-default">
                    <div className="panel-body">
                      <SavedArticle handleDeleteSavedArticle={this.handleDeleteSavedArticle} savedArticleInfo={res2}  key={i + "b"}/>
                    </div>
                  </div>
                );
              }.bind(this))}
              </div>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = Main;
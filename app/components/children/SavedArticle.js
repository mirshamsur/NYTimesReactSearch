var React = require("react");

var SavedArticle = React.createClass({

  handleDelete: function(event) {
    event.preventDefault();
    this.props.handleDeleteSavedArticle(this.props.savedArticleInfo);
  },

  render: function() {
    return (  
      <div>
        <a target="_blank" href={this.props.savedArticleInfo.url}>{this.props.savedArticleInfo.title}</a>
        &nbsp;•&nbsp;Saved Date {this.props.savedArticleInfo.date.substring(0,10)}
        <button onClick={this.handleDelete} className="btn btn-default btn-xs pull-right">Delete</button>
      </div>
    );
  }
});

module.exports = SavedArticle;
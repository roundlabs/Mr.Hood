import React    from 'react';
import { Link, withRouter } from 'react-router-dom';
import DashboardSidebar from './dashboard_sidebar/dashboard_sidebar';
import DashboardChart from '../charts/dashboard_chart/dashboard_chart';
import SearchBar from '../navbar/search/search_container';
import StockCard from '../stock_card/stock_card';


class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.marketNews = this.marketNews.bind(this);
    this.topStocks = this.topStocks.bind(this);
    this.state = {
      loading: true,
    };
  }


  componentDidMount() {
    this.props.fetchPortfolio(this.props.currentUser.id)
    // .then(() => this.props.fetchStocks())
    .then(() => this.props.fetchWatchlist())
    .then(() => this.props.fetchMarketNews())
    .then(() => this.props.fetchPortfolioSnapshots(this.props.currentUser.id))
    .then(() => this.props.fetchTopStocks())
    .then(() => this.setState({loading: false}))

  }

  marketNews() {
    let marketNews = [];
    for (let i = 0; i < this.props.marketNews.articles.length; i++) {
      let article = this.props.marketNews.articles[i];
      if (article.urlToImage !== null) {
        marketNews.push(
          <li className="article-container" key={i}>
            <div>
              <img src={article.urlToImage} width={250} className="article-image"></img>
            </div>
            <div className="article-text">
              <div className="article-source">{article.source.name}</div>
              <div className="article-text-bottom">
                <div className="article-title"><a href={article.url}>{article.title}</a></div>
                <div className="article-body">{article.description.slice(0, 200)}...</div>
              </div>
            </div>
          </li>
        )
      }
    }

    return marketNews;
  }

  topStocks() {
    let topStocks = [];
    for (var i = 0; i < this.props.topStocks.length; i++) {
      let topStock = this.props.topStocks[i];
      debugger
      topStocks.push(
        <StockCard
          key={i}
          symbol={topStock.symbol}
        />
      )
    }

    return topStocks;
  }


  render() {
    if (this.state.loading) {
      return <div>loading...</div>
    } else {
      return (
        <div className="dashboard-page">


          <nav className="navbar-container">
            <div className="navbar-left">
              <Link to="/">
                <img className="logo-image" src={window.logo} />
              </Link>
            </div>
            <div className="navbar-middle">
              <SearchBar />
            </div>
            <div className="navbar-right">
              <button className="header-button" onClick={this.props.logout}>Log Out</button>
            </div>
          </nav>


          <section className="main-container">
            <div className="main-stock-section">
              <div>
                <h1 className="dashboard-title">Welcome, {this.props.currentUser.first_name} </h1>
              </div>
              <DashboardChart
                data={this.props.snapshots}
                portfolio={this.props.portfolio}
                currentUser={this.props.currentUser}
              />
              <div>
                <div id="top-stocks-title">Top Movers</div>
                <ul className="top-stocks-container">
                  {this.topStocks()}
                </ul>
              </div>

              <div id="market-news-title">Recent News</div>
              <div className='news-container'>
                <ul>
                  {this.marketNews()}
                </ul>
              </div>
            </div>
            <div className="side">
              <DashboardSidebar
                stocks={this.props.stocks}
                holdings={this.props.portfolio.portfolio.holdings}
                watchlist={this.props.watchlist}
              />
            </div>
          </section>


        </div>
      );
    }
  };

};



export default Dashboard

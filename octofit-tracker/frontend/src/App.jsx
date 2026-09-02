import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import logo from '../../../docs/octofitapp-small.png';
import './App.css';

const navigation = [['/', 'Overview'], ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'], ['/teams', 'Teams'], ['/users', 'Members'], ['/workouts', 'Workouts']];

function Overview() {
  return <section className="overview-page"><p className="eyebrow">Mergington High School / PE department</p><h1>Move together.</h1><p className="lede">A clear view of the habits, teams, and small wins powering OctoFit.</p><div className="overview-grid"><article className="overview-feature"><span className="feature-number">01</span><h2>Log the work</h2><p>Keep every run, walk, and strength session visible in one shared rhythm.</p><NavLink className="text-link" to="/activities">View activities <span aria-hidden="true">-&gt;</span></NavLink></article><article className="overview-feature accent-feature"><span className="feature-number">02</span><h2>Find your pace</h2><p>Use the leaderboard as a nudge toward consistency, not a finish line.</p><NavLink className="text-link" to="/leaderboard">See standings <span aria-hidden="true">-&gt;</span></NavLink></article></div></section>;
}

function App() {
  return <div className="app-shell"><header className="app-header"><NavLink className="brand" to="/" aria-label="OctoFit home"><img src={logo} alt="" /><span>Octo<span>Fit</span></span></NavLink><nav className="main-nav" aria-label="Main navigation">{navigation.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}</nav><span className="status-dot">Live</span></header><main className="app-main"><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></main><footer className="app-footer">OctoFit Tracker <span>Build better habits, one session at a time.</span></footer></div>;
}

export default App;

import { useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useStore } from "../store/useStore";
import { useSubscriptions } from "../hooks/useSubscriptions";
import RecipeBuilder from "../components/RecipeBuilder";
import PopularRecipes from "../components/PopularRecipes";

export function Dashboard() {
  const { isAuthenticated } = useAuth();
  const authEmail = useStore((s) => s.authEmail);
  const alerts = useStore((s) => s.alerts);
  
  // Triggers alert fetching
  useSubscriptions();

  useEffect(() => {
    document.title = "Your Kitchen | AlphaRecipes";
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const activeRecipesCount = alerts.filter((a) => a.isActive).length;
  const userName = authEmail ? authEmail.split("@")[0] : "Chef";
  const isNewUser = alerts.length === 0;

  return (
    <div className="pt-32 pb-10 w-full">
      {/* Welcome section - Bolder Treatment */}
      <div className="relative max-w-5xl mx-auto px-4 mb-10 pt-8 pb-16 border-b border-surface-border/40 overflow-hidden">
        {/* Decorative background flare */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface/80 border border-surface-border backdrop-blur-sm shadow-sm text-xs font-semibold text-text uppercase tracking-wider">
              {activeRecipesCount > 0 ? (
                <span className="w-2 h-2 rounded-full inset-0 bg-success shadow-[0_0_8px_#6DD230] animate-pulse"></span>
              ) : (
                <span className="w-2 h-2 rounded-full inset-0 bg-surface-border"></span>
              )}
              {activeRecipesCount > 0 ? "Kitchen is active" : "Station is clean"}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-text to-text/50 leading-tight">
              Your Kitchen.
            </h1>
            
            <p className="max-w-md text-lg md:text-xl text-text/70 leading-relaxed font-medium">
              Welcome back, <strong className="text-text font-bold capitalize">{userName}</strong>.
              <br />
              {isNewUser 
                ? "Start from a popular recipe below and get your first alert cooking."
                : <span>You have <span className="text-primary font-bold">{activeRecipesCount}</span> active {activeRecipesCount === 1 ? 'recipe' : 'recipes'} simmering. What are we making next?</span>}
            </p>
          </div>
          
          <div className="shrink-0 pt-4 md:pt-0">
            <Link
              to="/dashboard/manage-recipes"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-surface text-text font-bold text-lg rounded-2xl border-2 border-surface-border overflow-hidden transition-all duration-400 ease-out hover:border-primary hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-primary/3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <svg
                className="w-6 h-6 relative z-10 text-text/70 group-hover:text-primary transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300">Manage Recipes</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="pt-6">
        {isNewUser ? (
          <>
            <PopularRecipes />
            <RecipeBuilder />
          </>
        ) : (
          <>
            <RecipeBuilder />
            <PopularRecipes />
          </>
        )}
      </div>
    </div>
  );
}

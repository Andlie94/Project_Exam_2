export function Loading() {
    return (
        <div className="loading flex items-center justify-center space-x-2">
            <div className="loading-spinner"></div>
            <div>Loading</div>
            <div className=" animate-bounce">.</div>
            <div className="animate-bounce">.</div>
            <div className="animate-bounce" >.</div>
        </div>
    );
}

export function LoadingGlobal() {
  return (
    <div className="loading-global bg-amber-100 w-16 h-16 flex items-center justify-center rounded-full animate-spin">
      <svg width="80" height="80" viewBox="0 0 64 64" fill="none">

        <path d="M8 32 A28 28 0 0 1 56 32" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
        
        <path d="M8 32 A24 24 0 0 1 56 32" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
        
        <path d="M8 34 A24 24 0 0 0 56 32" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
        
        <path d="M10 32 A28 26 0 0 0 54 32" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>

        <path d="M30 8 Q10 26 28 56" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
        <path d="M36 9 Q50 32 38 56" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
}


export function LoadingSkeleton() {
  return (
    <div className="flex flex-row justify-center space-x-4 mt-4 ">

      <div className="skeleton-loading animate-pulse flex flex-col space-y-2">
        <div className="skeleton-header h-20 w-30 bg-amber-100 opacity-30"></div>
        <div className="skeleton-body h-5 w-30 bg-amber-100 opacity-30"></div>
        <div className="skeleton-footer h-5 w-30 bg-amber-100 opacity-30"></div>
      </div>


      <div className="skeleton-loading animate-pulse flex flex-col space-y-2">
        <div className="skeleton-header h-20 w-30 bg-amber-100 opacity-30"></div>
        <div className="skeleton-body h-5 w-30 bg-amber-100 opacity-30"></div>
        <div className="skeleton-footer h-5 w-30 bg-amber-100 opacity-30"></div>
      </div>
      <div className="skeleton-loading animate-pulse flex flex-col space-y-2">
        <div className="skeleton-header h-20 w-30 bg-amber-100 opacity-30"></div>
        <div className="skeleton-body h-5 w-30 bg-amber-100 opacity-30"></div>
        <div className="skeleton-footer h-5 w-30 bg-amber-100 opacity-30"></div>
    </div>
    </div>
  );
}
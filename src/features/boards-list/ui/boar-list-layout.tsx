export  function BoardListLayout ({header, children, filters}: {header: React.ReactNode, children: React.ReactNode, filters: React.ReactNode}) {
  return (
  <div className="flex h-full min-h-0 flex-col gap-4 p-4">
    {header}
  <div className="flex items-center justify-between gap-2">
  {filters}
  </div>

  <div className="min-h-0 flex-1">

  {children}
  </div>
</div>)
};


export function BoardListLayoutFilters() {}
export function BoardListLayoutHeader({title, actions}: {title: string, actions: React.ReactNode}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      {actions}
    </div>
  )
}
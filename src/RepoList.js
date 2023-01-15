import React from 'react'

const RepoList = (currentRepos) => {
  return (
    <div>
      <h1 className="text-center text-lg font-lg mb-3">
        <strong>Repositories of {currentRepos.login}</strong>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentRepos.map((repo) => (
        <div className="bg-white rounded-lg p-6 shadow shadow-emerald-500">
            <h3>
              <strong>{repo.name}</strong>
            </h3>
            <p className="text-gray-700 mb-2">{repo.description}</p>
            {repo.private ? (
              <p className="bg-rose-400 py-1 px-2 text-xs text-white shadow rounded-lg ">
                Private
              </p>
            ) : (
              <p className="bg-emerald-400 py-1 px-2 text-xs text-white shadow rounded-lg inline">
                Public
              </p>
            )}
            <span className="flex flex-right">
              <p>{repo.stargazers_count.toLocaleString()} stars</p>
              <p className="pl-2">{repo.watchers_count.toLocaleString()} watchers</p>
              <p className="pl-2">{repo.open_issues} issues</p>
            </span>
            <span className="">
              <p className="text-gray-700 ">Created at: {repo.created_at}</p>
              <p className="text-gray-700">Last Pushed:{repo.pushed_at}</p>
            </span>
            <div>
            {repo.language && (
              <p className="bg-emerald-400 opacity-75 text-white py-1 px-2 rounded-lg shadow text-xs inline-block">
                {repo.language}
              </p>
            )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RepoList

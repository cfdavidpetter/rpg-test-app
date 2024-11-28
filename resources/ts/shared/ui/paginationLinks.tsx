import React from 'react'
interface Link {
  label: string;
  url: string | null;
  active: boolean;
}

interface Meta {
  from: number;
  to: number;
  total: number;
}

interface PaginationProps {
  pagination: {
    from: number;
    to: number;
    total: number;
  };
  links: Link[];
  meta?: Meta | null;
}

const PaginationLinks: React.FC<PaginationProps> = ({ pagination, links = [], meta = null }) => {
  return (
    <div className="my-2 sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <p className="text-sm leading-5 text-gray-700 px-2 py-2">
        Mostrando{' '}
        <span className="font-medium">
          {meta ? meta.from : pagination.from}
        </span>
        /
        <span className="font-medium">
          {meta ? meta.to : pagination.to}{' '}
        </span>
        (
        <span className="font-medium">
          {meta ? meta.total : pagination.total}
        </span>{' '}
        total)
      </p>
      <div>
        <span className="relative z-0 inline-flex rounded-md shadow-sm  px-2 py-2">
          <span>
            {links.map((link, index) => {
              const key = link.label + index
              if (link.active) {
                return (
                  <span key={key}>
                    <span
                      className="relative -ml-px inline-flex cursor-default items-center border border-gray-300 bg-blue-500 px-4 py-2 text-sm font-medium leading-5 text-gray-100"
                      dangerouslySetInnerHTML={{
                        __html: link.label,
                      }}
                    ></span>
                  </span>
                )
              }

              if (link.url === null) {
                return (
                  <span key={key}>
                    <span
                      className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium leading-5 text-gray-300"
                      dangerouslySetInnerHTML={{
                        __html: link.label,
                      }}
                    ></span>
                  </span>
                )
              }

              return (
                <span key={key}>
                  <a
                    href={link.url}
                    className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium leading-5 text-gray-700 hover:bg-gray-300"
                    dangerouslySetInnerHTML={{
                      __html: link.label,
                    }}
                  ></a>
                </span>
              )
            })}
          </span>
        </span>
      </div>
    </div>
  )
}

export default PaginationLinks
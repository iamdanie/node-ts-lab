import * as Sequelize from 'sequelize'

const getTransformedCriteria = (criteria) => {
  let whereCriteria = {}

  for (const property in criteria) {
    if (criteria.hasOwnProperty(property)) {
      const parameters = criteria[property]

      whereCriteria[property] = {
        $like: `%${criteria[property].query}%`
      }
    }
  }

  return whereCriteria
}

export const withPagination = (parameters: any) => {

  return {
    where: parameters.criteria ? getTransformedCriteria(parameters.criteria) : {},
    order: parameters.sortBy ? [[parameters.sortBy.field, parameters.sortBy.order]] : [],
    offset: parameters.pagination ? (parameters.pagination.size * (parameters.pagination.current - 1)) : 0,
    limit: parameters.pagination ? parameters.pagination.size : 25,
  }
}

export const returnPaginationResponse = (items, parameters: any) => {
  return {
    current: parameters.pagination.current,
    size: parameters.pagination.size,
    total: Math.ceil(items.length / parameters.pagination.size),
    itemCount: items.length
  }
}

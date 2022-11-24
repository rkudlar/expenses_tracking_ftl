json.array! @spent_records do |record|
  json.id                      record.id
  json.spent                   record.spent
  json.description             record.description
  json.category                record.category.name
end

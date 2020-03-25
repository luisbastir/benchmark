Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/hello", to: "routing#hello", as: "hello"
  get "/hello/json", to: "routing#hello_json", as: "hello_json"
  get "/hello/html", to: "routing#hello_html", as: "hello_html"
  get "/hello/html/:msg", to: "routing#hello_html_msg", as: "hello_html_msg"
  get "/hello/msg/:msg", to: "routing#msg", as: "hello_msg"
  get "/hello/query", to: "routing#query", as: "hello_query"
  get "/badrequest", to: "routing#badrequest", as: "badrequest"
  get "/list", to: "routing#list", as: "list"
end

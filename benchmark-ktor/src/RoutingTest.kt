package com.example

import io.ktor.application.call
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.gson.*
import io.ktor.response.*
import io.ktor.routing.Routing
import io.ktor.routing.get
import freemarker.cache.*
import io.ktor.freemarker.*

data class HelloResponse(val message: String)

fun Routing.routingTest() {
  get("/hello"){
    call.respondText("Hello World!")
  }

  get("/hello/json"){
    val hello = HelloResponse("Hello World!")
    call.respond(hello)
  }

  get("/hello/html"){
    call.respond(FreeMarkerContent("hello.ftl", mapOf("data" to HelloResponse(call.parameters["msg"] ?: "")), ""))
  }

  get("/hello/html/{msg}"){
    call.respond(FreeMarkerContent("hello_msg.ftl", mapOf("data" to HelloResponse(call.parameters["msg"] ?: "")), ""))
  }

  get("/hello/msg/{msg}"){
    val msg = "Hello World! - ${call.parameters["msg"]}"
    call.respondText(msg)
  }

  get("/hello/query"){
    val msg = "Hello World! - ${call.request.queryParameters["msg"]}"
    call.respondText(msg)
  }

  get("/badrequest"){
    call.respondText("Successful response!", ContentType.Text.Plain, HttpStatusCode.BadRequest) {}
  }

  get("/list"){
    var msg = ""
    for (x in 1 until 5001) {
      msg += "This is the line ${x}\n"
    }
    call.respondText(msg)
  }
}
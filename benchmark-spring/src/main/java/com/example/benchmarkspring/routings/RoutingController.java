package com.example.benchmarkspring.routings;

import com.example.benchmarkspring.models.HelloJsonResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoutingController {

  @GetMapping("/hello")
  public String hello() {
    return "Hello World!";
  }

  @GetMapping("/hello/json")
  public HelloJsonResponse helloJson() {
    return new HelloJsonResponse("Hello World!");
  }

  @GetMapping("/hello/msg/{msg}")
  public String helloMsg(@PathVariable String msg) {
    return "Hello World! - " + msg;
  }

  @GetMapping("/hello/query")
  public String helloQuery(@RequestParam(name = "msg") String msg) {
    return "Hello World! - " + msg;
  }

  @GetMapping("/badrequest")
  public ResponseEntity<String> badRequest() {
    return new ResponseEntity<>("Successful request!", HttpStatus.BAD_REQUEST);
  }

  @GetMapping("/list")
  public String listResponse() {
    String list = "";
    for (int x = 1; x <= 5000; x++) {
      list += "This is the line " + x + "\n<br>";
    }
    return list;
  }
}
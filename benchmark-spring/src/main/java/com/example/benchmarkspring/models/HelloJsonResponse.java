package com.example.benchmarkspring.models;

public class HelloJsonResponse {
  
  private String message;

  public HelloJsonResponse(String message) {
    this.message = message;
  }

  public String getMessage() {
    return this.message;
  }
  
  public void setMessage(String message) {
    this.message = message;
  }
}
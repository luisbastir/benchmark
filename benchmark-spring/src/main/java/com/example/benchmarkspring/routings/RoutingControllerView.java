package com.example.benchmarkspring.routings;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class RoutingControllerView {
  
  @GetMapping("/hello/html")
  public String helloHtml(Model model) {
    return "routing/hello";
  }

  @GetMapping("/hello/html/{msg}")
  public String helloHtmlMsg(@PathVariable String msg, Model model) {
    model.addAttribute("msg", msg);
    return "routing/hello_msg";
  }
}
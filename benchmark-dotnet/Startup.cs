using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace benchmark_dotnet
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc().AddRazorPagesOptions(options =>
      {
        options.Conventions.AddPageRoute("/HelloHtml","/hello/html");
        options.Conventions.AddPageRoute("/HelloMsgHtml","/hello/html/{msg}");
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Error");
      }

      app.UseStaticFiles();

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapGet("/hello", async context =>
        {
          await context.Response.WriteAsync("Hello World!");
        });
        endpoints.MapGet("/hello/json", async context =>
        {
          var message = new 
          {
            message = "Hello World!"
          };
          string json = JsonConvert.SerializeObject(message);
          context.Response.ContentType = "application/json";
          await context.Response.WriteAsync(json);
        });
        endpoints.MapGet("/hello/msg/{msg:alpha}", async context => 
        {
          var message = context.Request.RouteValues["msg"];
          await context.Response.WriteAsync($"Hello World! - {message}");
        });
        endpoints.MapGet("/hello/query", async context =>
        {
          var message = context.Request.Query["msg"].ToString();
          await context.Response.WriteAsync($"Hello World! - {message}");
        });
        endpoints.MapGet("/badrequest", async context => 
        {
          context.Response.StatusCode = 400;
          await context.Response.WriteAsync("Successful request!");
        });
        endpoints.MapGet("/list", async context => {
          var text = "";
          for (int x = 1; x <= 5000; x++)
          {
            text += "This is the line " + x + "\n";
          }
          await context.Response.WriteAsync(text);
        });


        endpoints.MapRazorPages();
        endpoints.MapControllers();
      });
    }
  }
}

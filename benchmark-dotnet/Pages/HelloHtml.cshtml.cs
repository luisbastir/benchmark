using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace benchmark_dotnet.Pages
{
  public class HelloHtmlModel : PageModel
  {
    private readonly ILogger<HelloHtmlModel> _logger;

    public HelloHtmlModel(ILogger<HelloHtmlModel> logger)
    {
      _logger = logger;
    }

    public void OnGet()
    {

    }
  }
}

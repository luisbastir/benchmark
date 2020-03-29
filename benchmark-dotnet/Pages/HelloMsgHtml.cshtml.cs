using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace benchmark_dotnet.Pages
{
  public class HelloMsgHtmlModel : PageModel
  {

    [BindProperty(SupportsGet = true)]
    public string Msg { get; set; }

    private readonly ILogger<HelloMsgHtmlModel> _logger;

    public HelloMsgHtmlModel(ILogger<HelloMsgHtmlModel> logger)
    {
      _logger = logger;
    }

    public void OnGet()
    {

    }
  }
}

    using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;


namespace CLED1.Pages
{
    public class problemOutputModel : PageModel
    {
        [BindProperty(Name = "list7", SupportsGet = true)]
        public List<List<string>> List7 { get; set; }

        int a { get; set; }
        

        [BindProperty]
        public string DrawingContent { get; set; }
        public async Task<IActionResult> OnGet()
        {
            var data = TempData["ListResults"] as string;
             List7 =  JsonSerializer.Deserialize<List<List<string>>>(data);
           
            return Page();
        }

        public IActionResult OnPostSave()
        {
            var drawingJson = DrawingContent;
            return new JsonResult(new { Valid = true });
        }
    }
}

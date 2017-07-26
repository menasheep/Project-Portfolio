using System;
using System.Collections.Generic;
using System.IO; // contains all classes that deal w/ input/output
using System.Linq; // for SQL queries
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace Wall
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
